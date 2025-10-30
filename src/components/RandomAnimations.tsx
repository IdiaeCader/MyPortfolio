"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const variants = [
  "anim-fade",
  "anim-slide-up",
  "anim-slide-down",
  "anim-slide-left",
  "anim-slide-right",
  "anim-zoom",
  "anim-zoom-rotate",
  "anim-blur-rise",
  "anim-tilt",
  "anim-drop",
];

export default function RandomAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const main = document.querySelector<HTMLElement>("main.site-main") || document.body;
    if (!main) return;

    // Target common page structures beyond home hero
    const candidates = Array.from(
      main.querySelectorAll<HTMLElement>(
        [
          "[data-anim]",
          "section > *",
          ".two-col > *",
          ".grid > *",
          ".values > li",
          ".card",
          ".testimonial",
          ".hero-text",
          ".hero-image",
        ].join(", ")
      )
    );

    const elements = candidates.filter((el, i) => candidates.indexOf(el) === i && el.offsetParent !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    elements.forEach((el, i) => {
      const v = variants[Math.floor(Math.random() * variants.length)];
      el.classList.add("anim", v);
      el.style.setProperty("--anim-dur", `${900 + Math.floor(Math.random() * 700)}ms`);
      el.style.setProperty("--anim-delay", `${i * 70}ms`);
      if (Math.random() < 0.5) el.dataset.animScroll = "1";
    });

    const start = () => {
      elements.forEach((el) => {
        if (el.dataset.animScroll === "1") io.observe(el);
        else requestAnimationFrame(() => el.classList.add("in"));
      });
    };

    const t = setTimeout(start, 500);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
