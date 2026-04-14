export const metadata = { title: "About — Japa Chants" };

export default function AboutPage() {
  return (
    <article className="prose-invert space-y-8 max-w-xl mx-auto">
      <header>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--accent-warm)]">about</p>
        <h1 className="display text-3xl sm:text-4xl text-[color:var(--fg)] mt-1 font-light">Japa Chants</h1>
      </header>

      <section className="space-y-3 text-[color:var(--fg-soft)] leading-relaxed">
        <p>
          A quiet space for daily chanting. Sanskrit stotras with line-aligned Hindi, Tamil,
          and IAST transliteration. A mala counter that fits in your pocket. Installable as a
          Progressive Web App and works offline once you&apos;ve opened a chant.
        </p>
        <p>
          Built with devotion, not distraction: no ads, no tracking, no accounts. Your
          practice data stays on your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="display text-2xl text-[color:var(--fg)]">Credits</h2>
        <ul className="space-y-2 text-[color:var(--fg-soft)]">
          <li>
            Chant texts sourced from{" "}
            <a className="text-[color:var(--accent)] underline" href="https://vignanam.org" target="_blank" rel="noopener">
              vignanam.org
            </a>{" "}
            — the Vaidika Vignanam project, a public-domain repository of Vedic and stotra texts in many scripts.
          </li>
          <li>
            Reading layout (Sanskrit-first, tap-to-reveal) inspired by{" "}
            <a className="text-[color:var(--accent)] underline" href="https://greenmesg.org" target="_blank" rel="noopener">
              greenmesg.org
            </a>
            .
          </li>
          <li>
            Counter design inspired by{" "}
            <a className="text-[color:var(--accent)] underline" href="https://japa108.com" target="_blank" rel="noopener">
              japa108.com
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="display text-2xl text-[color:var(--fg)]">On the texts</h2>
        <p className="text-[color:var(--fg-soft)] leading-relaxed">
          These shastras are public-domain shruti and smriti — the inheritance of every
          sadhaka. Any errors in transliteration or typesetting are ours; please flag them and we&apos;ll correct.
        </p>
      </section>

      <section className="space-y-3 pt-6 text-center text-[color:var(--fg-soft)]">
        <div className="mala-divider max-w-xs mx-auto">
          <span>◆</span>
        </div>
        <p className="text-sm italic">ॐ शान्तिः शान्तिः शान्तिः</p>
      </section>
    </article>
  );
}
