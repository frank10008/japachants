#!/usr/bin/env bash
# Overnight autonomous translator. Run by system cron at 01:03 UTC via
# /etc/cron.d/japachants-overnight. Invokes Claude Code non-interactively
# with a long-running orchestration prompt.
#
# This script is robust — it doesn't depend on any Claude Code session
# being open, runs entirely from the system scheduler, logs to a dated
# file under /var/log/japachants/.
set -u
set -o pipefail

LOG_DIR="/var/log/japachants"
mkdir -p "$LOG_DIR"
STAMP="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
LOG="$LOG_DIR/overnight-$STAMP.log"

cd /root/hetzner-aol/japachants

{
  echo "=== $(date -u) — overnight run starting ==="
  echo "cwd: $(pwd)"
  echo "pending batches:"
  ls cache/batches/sonnet-*.json 2>/dev/null | grep -v -- -out | sort

  # Hand the full orchestration prompt to a non-interactive Claude Code
  # session. Claude will dispatch sonnet subagents itself in waves of 3
  # and run the merge/deploy steps.
  /usr/bin/claude -p --dangerously-skip-permissions \
    --add-dir /root/hetzner-aol/japachants \
    "$(cat scripts/overnight-prompt.txt)"

  RC=$?
  echo "=== $(date -u) — claude exited with $RC ==="

  # Final safety net: even if Claude didn't fully finish, make sure the DB
  # on disk is vacuumed, gzipped, committed, and deployed so the morning
  # snapshot reflects whatever translations did land.
  echo "--- safety net: merge, vacuum, gzip, commit, deploy ---"
  npx tsx scripts/merge-llm-batches.ts || true
  sqlite3 db/chants.db "VACUUM;" || true
  rm -f db/chants.db-shm db/chants.db-wal
  gzip -9 -f -c db/chants.db > db/chants.db.gz
  git add db/chants.db.gz OVERNIGHT-SUMMARY.md 2>/dev/null || true
  git -c user.email="claude@siddha.pro" -c user.name="Claude" \
    commit -m "Overnight run $(date +%F): safety-net snapshot" 2>&1 || true
  git push 2>&1 || true
  ssh -o ConnectTimeout=10 hetzner-aol \
    "cd /root/japachants && git pull && docker compose build && docker compose up -d" \
    2>&1 || true

  # Refresh Obsidian vault
  npx tsx scripts/export-obsidian.ts || true
  (cd obsidian-vault && \
    git add -A && \
    git -c user.email="claude@siddha.pro" -c user.name="Claude" \
      commit -m "Overnight refresh $(date +%F)" 2>&1 && \
    git push 2>&1) || true

  echo "=== $(date -u) — overnight run finished ==="
} >> "$LOG" 2>&1
