import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "../components/Header"; // removed, not used
import BackgroundBlobs from "../components/BackgroundBlobs";
import Link from "next/link";
import RevealOnLoad from "../components/RevealOnLoad";
import RandomAnimations from "../components/RandomAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tristan McClean — Environment Artist",
  description: "Portfolio of Tristan McClean — environment art, world building, and level design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="vercel-toolbar" content="false" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundBlobs />
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="logo">Tristan McClean</Link>
            <nav className="nav-desktop">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="nav-panel">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <RevealOnLoad />
        <RandomAnimations />
        <main className="container site-main reveal-seq">
          {children}
        </main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <p>
              &copy; <span id="year">{new Date().getFullYear()}</span> Tristan McClean's Portfolio.
            </p>
            <nav className="footer-nav">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/gallery">Gallery</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
