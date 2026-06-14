import './TemplateDetail.css'
import { GetTemplateBtn } from '@/components/template-detail/GetTemplateBtn';
import Gallery from '@/components/template-detail/Gallery';
import Faq from '@/components/template-detail/Faq';
import { OrderDialog } from '@/components/template-detail/OrderDialog';
import EarlyOffer from '@/components/template-detail/EarlyOffer';
import { StrapiTemplateDetail } from '@/lib/template-detail/types';
import TemplateDetailDescription from './TemplateDetailDescription';
import FormatCurrency from '../FormatCurrency';

export interface TemplateDetailProps {
	data: StrapiTemplateDetail
}
export default async function TemplateDetail(props: TemplateDetailProps) {
	const { data } = props

	return (
		<>
			<div className="breadcrumb">
				<div className="breadcrumb-inner">
					<a href="index.html">Home</a><span className="breadcrumb-sep">›</span>
					<a href="#">Templates</a><span className="breadcrumb-sep">›</span>
					<a href={data.category.slug}>{data.category.name}</a><span className="breadcrumb-sep">›</span>
					<span className="breadcrumb-current">{data.name}</span>
				</div>
			</div>

			<section className="main">
				<div className="main-inner">

					<div className="col-info">
						<div className="category-pill">{data.category.emoji} {data.category.name}</div>
						<h1 className="product-h1">{data.name}</h1>
						<p className="product-tagline">{data.tagline}</p>

						<div className="rating-row">
							<span className="stars" aria-label="5 stars">★★★★★</span>
							<span className="rating-label">New</span>
							<span className="early-label">Be the first to review</span>
						</div>

						<div className="price-row">
							<FormatCurrency amount={data.price} currency={data.currency} />
							<span className="price-currency">{data.currency}</span>
							<span className="price">{data.price}</span>
						</div>
						<p className="price-sub">{data.priceSub}</p>

						<div id="order">
							<GetTemplateBtn className="btn-cta" />
							<p className="delivery-note"><strong>How delivery works:</strong> {data.deliveryNote}</p>
						</div>

						<div className="divider"></div>

						<ul className="meta-list">
							{data.metaList.map((item) => (
								<li key={item.key} className="meta-item">
									<span className="meta-key">{item.key}</span>
									<span className="meta-val">{item.value}</span>
								</li>
							))}
						</ul>

						<div className="compat-note">{data.compatNote}</div>
					</div>

					<div className="col-gallery">
						<Gallery tabs={data.galleryTabs} />
					</div>

				</div>
			</section>

			<div className="below">
				<div className="below-inner">

					<TemplateDetailDescription blocks={data.description} />

					{
						!!data.earlyOffer &&
						(
							<>
								<div className="section-divider"></div>
								<EarlyOffer offer={data.earlyOffer} />
							</>
						)
					}

				</div>
			</div>

			<div className="sticky-bar" id="sticky-bar" role="complementary" aria-label="Purchase">
				<div>
					<div className="sticky-bar-name">{data.name}</div>
					<div className="sticky-bar-price">{data.currency}{data.price}</div>
				</div>
				<GetTemplateBtn className="btn-sticky" />
			</div>

			<OrderDialog />
		</>
	);
}
