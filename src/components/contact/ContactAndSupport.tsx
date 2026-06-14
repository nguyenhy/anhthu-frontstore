import './ContactAndSupport.css'
import Contact from './Contact'
import Faq from '@/components/template-detail/Faq'
import SupportInfoCard from '@/components/support/InfoCard'
import { StrapiContactPage } from '@/lib/contact/types'

export type ContactAndSupportProps = {
	content: StrapiContactPage

}
export default async function ContactAndSupport(props: ContactAndSupportProps) {
	const { content } = props
	return (
		<>
			{
				!!content.support &&
				(
					<section className="hero">
						<div className="hero-inner">
							<p className="eyebrow">
								{content.support.hero.eyebrow}
							</p>

							<h1 className="hero-headline">
								{content.support.hero.headline}
							</h1>

							<p className="hero-sub">
								{content.support.hero.subtext}
							</p>
						</div>
					</section>
				)
			}

			{/* <!-- Main --> */}
			<main className="content">
				<div className="content-grid">

					{/* <!-- Left: FAQ + contact info --> */}
					<div>
						<p className="section-label">FAQ</p>
						<h2 className="section-title">Quick answers</h2>

						{
							!!content.faq.length &&
							<Faq items={content.faq} />
						}

						{
							!!content.support?.infoCards.length &&
							(
								<SupportInfoCard cards={content.support.infoCards} />
							)
						}
					</div>

					{/* <!-- Right: Contact form --> */}
					{
						content.contact &&
						<Contact content={content.contact} />
					}
				</div>
			</main >
		</>
	)
}