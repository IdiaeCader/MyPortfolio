import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, message, name } = await req.json().catch(() => ({} as any));
    if (!email || !message) {
      return Response.json({ ok: false, error: "Email and message are required." }, { status: 400 });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const to = process.env.COMPANY_EMAIL || process.env.SMTP_USER;
    const subject = `New message — Tristan McClean Portfolio${name ? ` — ${name}` : ""}`;
    const text = `From: ${name || "Anonymous"} <${email}>\n\n${message}`;
    const html = `
      <p><strong>From:</strong> ${name || "Anonymous"} &lt;${email}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, "<br>")}</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      replyTo: email,
      to, subject, text, html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return Response.json({ ok: false, error: "Failed to send message." }, { status: 500 });
  }
}
