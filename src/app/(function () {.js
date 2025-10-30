(function () {
	// Delay until DOM is ready to avoid SSR timing issues
	function ready(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}

	ready(() => {
		const byId = (id) => document.getElementById(id);

		// Navigation is now handled inside the React Header component.

		// Footer year (kept for non-React pages or progressive enhancement)
		const yearEl = byId('year');
		if (yearEl) yearEl.textContent = String(new Date().getFullYear());

		// FAQ accordion
		document.querySelectorAll('.faq-item').forEach((item) => {
			const btn = item.querySelector('.faq-q');
			const ans = item.querySelector('.faq-a');
			if (!btn || !ans) return;
			btn.addEventListener('click', () => {
				const expanded = btn.getAttribute('aria-expanded') === 'true';
				btn.setAttribute('aria-expanded', String(!expanded));
				ans.hidden = expanded;
			});
		});

		// Contact form
		const form = byId('contact-form');
		if (form) {
			const status = byId('form-status');
			const submitBtn = byId('submit-btn');
			form.addEventListener('submit', async (e) => {
				e.preventDefault();
				const formData = new FormData(form);
				const payload = Object.fromEntries(formData.entries());

				if (!payload.email || !payload.message) {
					if (status) { status.textContent = 'Please fill in email and message.'; status.className = 'form-status err'; }
					return;
				}

				try {
					if (submitBtn) submitBtn.disabled = true;
					if (status) { status.textContent = 'Sending...'; status.className = 'form-status'; }
					const res = await fetch('/api/contact', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(payload)
					});
					const data = await res.json();
					if (res.ok && data.ok) {
						if (status) { status.textContent = 'Thanks! Your message has been sent.'; status.className = 'form-status ok'; }
						form.reset();
					} else {
						throw new Error(data.error || 'Failed to send.');
					}
				} catch (_) {
					if (status) { status.textContent = 'Sorry, something went wrong. Please try again.'; status.className = 'form-status err'; }
				} finally {
					if (submitBtn) submitBtn.disabled = false;
				}
			});
		}
	});
})();
