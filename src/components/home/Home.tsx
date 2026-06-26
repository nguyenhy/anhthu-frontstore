"use client"
import './Home.css'
import { useEffect, useRef } from 'react';


export function Homepage() {
	const heroFormRef = useRef<HTMLFormElement>(null);
	const bandFormRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		// 1. Scroll to top and handle fade-in effect on load
		// window.scrollTo(0, 0);
		document.body.style.visibility = 'visible';
		document.body.style.transition = 'opacity 0.2s ease';
		document.body.style.opacity = '1';

		// 2. Countdown Timer Logic
		const target = new Date('2026-07-05T00:00:00');
		const pad = (n: number) => String(n).padStart(2, '0');

		const tick = () => {
			const diff = Math.max(0, target.getTime() - new Date().getTime());

			const elDays = document.getElementById('cd-days');
			const elHours = document.getElementById('cd-hours');
			const elMins = document.getElementById('cd-mins');
			const elSecs = document.getElementById('cd-secs');

			if (elDays) elDays.textContent = pad(Math.floor(diff / 864e5));
			if (elHours) elHours.textContent = pad(Math.floor((diff % 864e5) / 36e5));
			if (elMins) elMins.textContent = pad(Math.floor((diff % 36e5) / 6e4));
			if (elSecs) elSecs.textContent = pad(Math.floor((diff % 6e4) / 1e3));
		};

		tick();
		const intervalId = setInterval(tick, 1000);

		// 3. Form Setup Function
		const setupForm = (form: HTMLFormElement | null, inputId: string, successId: string) => {
			if (!form) return;
			const inp = form.querySelector(`#${inputId}`) as HTMLInputElement;
			const ok = form.querySelector(`#${successId}`) as HTMLElement;
			const btn = form.querySelector('button') as HTMLButtonElement;
			if (!inp || !ok || !btn) return;

			const handleSubmit = (e: SubmitEvent) => {
				e.preventDefault();
				if (!inp.value || !inp.value.includes('@')) {
					inp.style.borderColor = '#c0392b';
					inp.focus();
					return;
				}
				inp.style.borderColor = '';
				btn.disabled = true;
				inp.disabled = true;
				ok.style.display = 'block';
			};

			const handleInput = () => {
				inp.style.borderColor = '';
			};

			form.addEventListener('submit', handleSubmit);
			inp.addEventListener('input', handleInput);

			return () => {
				form.removeEventListener('submit', handleSubmit);
				inp.removeEventListener('input', handleInput);
			};
		};

		const cleanupHero = setupForm(heroFormRef.current, 'hero-email', 'hero-success');
		const cleanupBand = setupForm(bandFormRef.current, 'band-email', 'band-success');

		// 4. FAQ Accordion Logic
		const faqTriggers = document.querySelectorAll('.faq-trigger');

		const handleFaqClick = (btn: Element) => {
			const item = btn.closest('.faq-item');
			if (!item) return;
			const body = item.querySelector('.faq-body') as HTMLElement;
			const open = item.classList.contains('open');

			document.querySelectorAll('.faq-item.open').forEach((el) => {
				el.classList.remove('open');
				const elBody = el.querySelector('.faq-body') as HTMLElement;
				const elBtn = el.querySelector('.faq-trigger');
				if (elBody) elBody.style.maxHeight = '0';
				if (elBtn) elBtn.setAttribute('aria-expanded', 'false');
			});

			if (!open && body) {
				item.classList.add('open');
				body.style.maxHeight = body.scrollHeight + 'px';
				btn.setAttribute('aria-expanded', 'true');
			}
		};

		const eventListeners: Array<[Element, () => void]> = [];
		faqTriggers.forEach((btn) => {
			const listener = () => handleFaqClick(btn);
			btn.addEventListener('click', listener);
			eventListeners.push([btn, listener]);
		});

		// Cleanup all side effects on unmount
		return () => {
			clearInterval(intervalId);
			if (cleanupHero) cleanupHero();
			if (cleanupBand) cleanupBand();
			eventListeners.forEach(([btn, listener]) => {
				btn.removeEventListener('click', listener);
			});
		};
	}, []);

	return (
		<>
			<section className="hero">
				<div className="hero-inner">
					<div className="launch-badge">
						<span className="launch-badge-dot"></span>Launching July 5th
					</div>
					<h1>Ready-To-Use Productivity Templates</h1>
					<p className="hero-sub">Skip the setup. Boost your output instantly.</p>

					<div className="countdown">
						<div className="cd-block">
							<span className="cd-num" id="cd-days">00</span>
							<span className="cd-label">Days</span>
						</div>
						<div className="cd-sep">:</div>
						<div className="cd-block">
							<span className="cd-num" id="cd-hours">00</span>
							<span className="cd-label">Hours</span>
						</div>
						<div className="cd-sep">:</div>
						<div className="cd-block">
							<span className="cd-num" id="cd-mins">00</span>
							<span className="cd-label">Minutes</span>
						</div>
						<div className="cd-sep">:</div>
						<div className="cd-block">
							<span className="cd-num" id="cd-secs">00</span>
							<span className="cd-label">Seconds</span>
						</div>
					</div>

					<form className="email-form" id="hero-form" ref={heroFormRef}>
						<input
							className="email-input"
							type="email"
							id="hero-email"
							placeholder="Your email address"
							autoComplete="email"
							required
						/>
						<button className="btn-primary" type="submit">
							Join the waitlist
						</button>
						<p className="form-note">No spam. One email at launch.</p>
						<p className="form-success" id="hero-success">
							✓ You're on the list! We'll email you July 5th.
						</p>
					</form>
				</div>
			</section>

			<section className="cta-band">
				<div className="cta-band-inner">
					<h2>Be first. Get early bird pricing.</h2>
					<ul className="cta-bullets">
						<li>
							<span className="cta-check">✓</span>Exclusive launch discount for waitlist members
						</li>
						<li>
							<span className="cta-check">✓</span>First access when doors open July 5th
						</li>
						<li>
							<span className="cta-check">✓</span>No spam. One email at launch.
						</li>
					</ul>
					<form
						className="email-form"
						id="band-form"
						ref={bandFormRef}
						style={{ margin: '0 auto' }}
						noValidate
					>
						<input
							className="email-input"
							type="email"
							id="band-email"
							placeholder="Your email address"
							autoComplete="email"
							required
						/>
						<button className="btn-primary" type="submit">
							Notify me at launch
						</button>
						<p className="form-note">Join others already on the list.</p>
						<p className="form-success" id="band-success">
							✓ You're on the list! We'll email you July 5th.
						</p>
					</form>
				</div>
			</section>

			<section className="faq">
				<div className="faq-inner">
					<p className="section-eyebrow">FAQ</p>
					<h2 className="section-heading">Common questions</h2>
					<ul className="faq-list" role="list">
						<li className="faq-item">
							<button className="faq-trigger" aria-expanded="false">
								<span className="faq-q">What exactly is Simpla Kit?</span>
								<span className="faq-icon" aria-hidden="true">+</span>
							</button>
							<div className="faq-body" role="region">
								<div className="faq-body-inner">
									Productivity template kits. Ready to use, no setup needed. Download, make a copy, and start working immediately.
								</div>
							</div>
						</li>
						<li className="faq-item">
							<button className="faq-trigger" aria-expanded="false">
								<span className="faq-q">Do I need a specific account?</span>
								<span className="faq-icon" aria-hidden="true">+</span>
							</button>
							<div className="faq-body" role="region">
								<div className="faq-body-inner">
									No paid tools, no subscriptions, no complicated installs required.
								</div>
							</div>
						</li>
						<li className="faq-item">
							<button className="faq-trigger" aria-expanded="false">
								<span className="faq-q">Is this a subscription?</span>
								<span className="faq-icon" aria-hidden="true">+</span>
							</button>
							<div className="faq-body" role="region">
								<div className="faq-body-inner">
									One-time purchase. The template is yours forever, including future updates to that kit.
								</div>
							</div>
						</li>
						<li className="faq-item">
							<button className="faq-trigger" aria-expanded="false">
								<span className="faq-q">When can I buy it?</span>
								<span className="faq-icon" aria-hidden="true">+</span>
							</button>
							<div className="faq-body" role="region">
								<div className="faq-body-inner">
									July 5th, 2026. Join the waitlist above to get notified the moment we launch — plus an exclusive early bird discount.
								</div>
							</div>
						</li>
						<li className="faq-item">
							<button className="faq-trigger" aria-expanded="false">
								<span className="faq-q">What if it doesn't work for me?</span>
								<span className="faq-icon" aria-hidden="true">+</span>
							</button>
							<div className="faq-body" role="region">
								<div className="faq-body-inner">
									Your satisfaction is guaranteed. If you run into any issue with your template, reach out and we'll make it right.
								</div>
							</div>
						</li>
					</ul>
				</div>
			</section>
		</>
	);
}