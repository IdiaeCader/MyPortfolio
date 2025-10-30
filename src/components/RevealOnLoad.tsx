"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.reveal-seq");
    if (!main) return;

    // Collect items in DOM order: each section's immediate children
    const sections = Array.from(main.querySelectorAll<HTMLElement>("section"));
    const items: HTMLElement[] = [];
    sections.forEach((sec) => {
      items.push(...Array.from(sec.children) as HTMLElement[]);
    });
    // Fallback: if no sections, animate main's direct children
    if (items.length === 0) {
      items.push(...(Array.from(main.children) as HTMLElement[]));
    }

    items.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${i * 80}ms`);
      el.classList.add("reveal-item");
    });
  }, [pathname]);

  return null;
}
