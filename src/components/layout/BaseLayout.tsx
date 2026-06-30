import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import CookieConsent, { resetConsent } from "@/components/cookie/CookieConsent";

interface Props extends HTMLAttributes<HTMLDivElement> {
	headerSlotRight?: ReactNode;
}

export default function BaseLayout({ children, headerSlotRight }: Props) {
	return (
		<body>
			<header className="nav">
				<div className="nav-inner">
					<Link href="/" className="nav-logo">
						<span className="nav-logo-badge">S</span>SimplaKit
					</Link>
					<nav aria-label="Main navigation">
						<ul className="nav-links">
							<li><Link href="/templates">Templates</Link></li>
							<li><Link href="/contact">Support</Link></li>
						</ul>
					</nav>
					{headerSlotRight}
				</div>
			</header>

			{children}

			<CookieConsent />

			<footer className="footer">
				<div className="footer-inner">
					<div>
						<Link className="footer-logo" href="/"><span className="footer-logo-badge">S</span>SimplaKit</Link>
						<p className="footer-tagline">Google Sheets templates for independent workers.</p>
					</div>
					<div className="footer-links">
						<div className="footer-col">
							<p className="footer-col-title">Templates</p>
							<ul>
								<li><Link href="/template/finance-invoicing">Finance &amp; Invoicing</Link></li>
								<li><Link href="/template/project-tracking">Project Tracking</Link></li>
								<li><Link href="/template/client-management">Client Management</Link></li>
							</ul>
						</div>
						<div className="footer-col">
							<p className="footer-col-title">Support</p>
							<ul>
								<li><Link href="/contact">Contact us</Link></li>
								<li><Link href="/sitemap.xml">Site Map</Link></li>
							</ul>
						</div>
						<div className="footer-col">
							<p className="footer-col-title">Legal</p>
							<ul>
								<li><Link href="/terms">Terms of Service</Link></li>
								<li><Link href="/privacy">Privacy Policy</Link></li>
								<li><Link href="/refund">Refund Policy</Link></li>
								<li><button onClick={resetConsent}>Cookie Settings</button></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<span>© {new Date().getFullYear()} SimplaKit. All rights reserved.</span>
				</div>
			</footer>
		</body>
	)
}
