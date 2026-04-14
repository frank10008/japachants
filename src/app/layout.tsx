import type { Metadata, Viewport } from "next";
import { Noto_Serif_Devanagari, Noto_Serif_Tamil } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { FontScaleProvider } from "@/components/font-scale-provider";
import { MobileNav } from "@/components/mobile-nav";

// Only the script fonts come from Google Fonts. UI text uses self-hosted
// Helvetica Neue declared via @font-face in globals.css.
const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-devanagari",
  display: "swap",
});
const tamil = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Japa Chants — Sanskrit stotras and mala counter",
  description: "A quiet space for chanting. Sanskrit, Hindi, Tamil, and transliteration. Offline-ready.",
  manifest: "/manifest.json",
  applicationName: "Japa Chants",
  appleWebApp: {
    capable: true,
    title: "Japa",
    statusBarStyle: "black-translucent",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff3e7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1200" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${devanagari.variable} ${tamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <FontScaleProvider />
        <header
          className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--bg)]/92 border-b border-[color:var(--border)]"
          style={{ paddingTop: "var(--safe-top)" }}
        >
          <nav className="max-w-3xl mx-auto px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
            <Link href="/" className="shrink-0 flex items-center" aria-label="Japa Chants — home">
              <Image
                src="/japa108/logo.png"
                alt="japa 108"
                width={144}
                height={38}
                priority
                className="h-8 sm:h-9 w-auto"
              />
            </Link>
            <div className="hidden sm:flex gap-6 text-[13px] font-medium text-[color:var(--fg)] uppercase tracking-wider">
              <Link href="/library" className="hover:text-[color:var(--accent-warm)] transition-colors">Library</Link>
              <Link href="/counter" className="hover:text-[color:var(--accent-warm)] transition-colors">Counter</Link>
              <Link href="/settings" className="hover:text-[color:var(--accent-warm)] transition-colors">Settings</Link>
            </div>
          </nav>
        </header>
        <main
          className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-12 pb-28 sm:pb-12"
          style={{ paddingLeft: "max(1rem, var(--safe-left))", paddingRight: "max(1rem, var(--safe-right))" }}
        >
          {children}
        </main>
        <footer
          className="border-t border-[color:var(--border)] py-5 text-center text-[11px] text-[color:var(--fg-soft)] hidden sm:block"
          style={{ paddingBottom: "max(1.25rem, var(--safe-bottom))" }}
        >
          <hr className="hr-gold mb-3 max-w-xs mx-auto" />
          <p>
            Texts from{" "}
            <a className="underline" href="https://vignanam.org" target="_blank" rel="noopener">vignanam.org</a>
            {" · "}
            <Link href="/about" className="underline">about</Link>
          </p>
        </footer>
        <MobileNav />
        <script
          dangerouslySetInnerHTML={{
            __html: `if ("serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {})); }`,
          }}
        />
      </body>
    </html>
  );
}
