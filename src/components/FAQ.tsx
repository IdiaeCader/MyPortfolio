"use client";

import { useState } from "react";

type Item = { q: string; a: string };

const items: Item[] = [
  { q: "What areas do you serve?", a: "We primarily serve the local metro area and surrounding counties." },
  { q: "Are you licensed and insured?", a: "Yes, we are fully licensed and insured. Certificates available on request." },
  { q: "How do I get a quote?", a: "Use the contact form or call us. We’ll schedule a walkthrough and provide an estimate." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {it.q}
          </button>
          <div className="faq-a" hidden={open !== i}>{it.a}</div>
        </div>
      ))}
    </div>
  );
}
