"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: "idle"|"sending"|"ok"|"err"; msg?: string }>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;

    if (!payload.email || !payload.message) {
      setStatus({ type: "err", msg: "Please fill in email and message." });
      return;
    }

    try {
      setStatus({ type: "sending", msg: "Sending..." });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setStatus({ type: "ok", msg: "Thanks! Your message has been sent." });
        e.currentTarget.reset();
      } else {
        throw new Error(data?.error || "Failed to send.");
      }
    } catch {
      setStatus({ type: "err", msg: "Sorry, something went wrong. Please try again." });
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email<span className="req">*</span></label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="form-row">
        <label htmlFor="message">Message<span className="req">*</span></label>
        <textarea id="message" name="message" rows={5} placeholder="Tell us about your project" required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status.type === "sending"}>
        {status.type === "sending" ? "Sending..." : "Send Message"}
      </button>
      <p className={`form-status ${status.type === "ok" ? "ok" : status.type === "err" ? "err" : ""}`} role="status" aria-live="polite">
        {status.msg}
      </p>
    </form>
  );
}
