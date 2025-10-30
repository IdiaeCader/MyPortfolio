"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        document.body.classList.toggle("no-scroll", open);
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.classList.remove("no-scroll");
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const links = (
        <ul>
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link></li>
            <li><Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
    );

    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                    <Link href="/" className="logo">Your Construction Co.</Link>

                    <button
                        className="nav-toggle"
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        aria-label="Toggle navigation"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                    </button>

                    {/* Desktop nav (horizontal) */}
                    <nav className="nav-desktop" aria-label="Primary">
                        {links}
                    </nav>
                </div>
            </header>

            {/* Mobile overlay (portal to body for correct stacking and clicks) */}
            {mounted && open && createPortal(
                <>
                    <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
                    <nav id="mobile-nav" className="nav-panel open" aria-label="Primary">
                        {links}
                    </nav>
                </>,
                document.body
            )}
        </>
    );
}
