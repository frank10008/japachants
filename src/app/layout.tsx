import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Noto_Serif_Devanagari, Noto_Serif_Tamil } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
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
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf5ec" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1530" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${devanagari.variable} ${tamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--bg)]/80 border-b border-[color:var(--border)]">
          <nav className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
            <Link href="/" className="display text-xl tracking-tight text-[color:var(--fg)]">
              <span className="text-[color:var(--accent)]">ॐ</span> Japa
            </Link>
            <div className="flex gap-5 text-sm text-[color:var(--fg-soft)]">
              <Link href="/library" className="hover:text-[color:var(--accent)] transition-colors">Library</Link>
              <Link href="/counter" className="hover:text-[color:var(--accent)] transition-colors">Counter</Link>
              <Link href="/settings" className="hover:text-[color:var(--accent)] transition-colors hidden sm:inline">Settings</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-8 md:py-12">{children}</main>
        <footer className="border-t border-[color:var(--border)] py-6 text-center text-xs text-[color:var(--fg-soft)]">
          <div className="mala-divider mb-3 max-w-xs mx-auto">
            <span className="text-[color:var(--accent-soft)]">◆</span>
          </div>
          <p>
            Texts from{" "}
            <a className="underline" href="https://vignanam.org" target="_blank" rel="noopener">vignanam.org</a>
            {" · "}
            <Link href="/about" className="underline">about</Link>
          </p>
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `if ("serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {})); }`,
          }}
        />
      </body>
    </html>
  );
}
