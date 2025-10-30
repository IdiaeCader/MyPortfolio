import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
	// Basic validation
	const { email, message, name } = req.body || {};
	if (!email || !message) {
		return res.status(400).json({ ok: false, error: 'Email and message are required.' });
	}
	const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (!emailOk) {
		return res.status(400).json({ ok: false, error: 'Invalid email address.' });
	}

	// Transport via SMTP (no paid APIs)
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 587),
		secure: String(process.env.SMTP_SECURE || 'false') === 'true',
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	});

	const to = process.env.COMPANY_EMAIL || process.env.SMTP_USER;
	const subject = `New message from website${name ? ` - ${name}` : ''}`;
	const text = `From: ${name || 'Anonymous'} <${email}>\n\n${message}`;
	const html = `
		<p><strong>From:</strong> ${name || 'Anonymous'} &lt;${email}&gt;</p>
		<p><strong>Message:</strong></p>
		<p>${String(message).replace(/\n/g, '<br>')}</p>
	`;

	try {
		await transporter.sendMail({
			from: process.env.SMTP_USER, // authenticated sender
			replyTo: email, // lets you reply directly to the user
			to,
			subject,
			text,
			html
		});
		return res.json({ ok: true });
	} catch (err) {
		console.error('Mail error:', err);
		return res.status(500).json({ ok: false, error: 'Failed to send message.' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
