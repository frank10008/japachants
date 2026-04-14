import { listChantsForClient, listDeities } from "@/lib/db";
import { LibraryBrowser } from "@/components/library-browser";

export const dynamic = "force-static";
export const metadata = { title: "Library — Japa Chants" };

export default function LibraryPage() {
  const chants = listChantsForClient();
  const deities = listDeities();
  return <LibraryBrowser chants={chants} deities={deities} />;
}
