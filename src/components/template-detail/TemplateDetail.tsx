import './TemplateDetail.css'
import { GetTemplateBtn } from '@/components/template-detail/GetTemplateBtn';
import Gallery from '@/components/template-detail/Gallery';
import EarlyOffer from '@/components/template-detail/EarlyOffer';
import { StrapiTemplateDetail } from '@/lib/template-detail/types';
import FormatCurrency from '../FormatCurrency';
import { setAttr } from '@directus/visual-editing'
import RichTextRender from '../RichTextRender';
import Faq from './Faq';
import MaterialIcon from '../MaterialIcon';
import RatingInput from '../RatingInput';

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
					<a
						data-directus={
							setAttr({
								collection: 'template',    // The parent collection name
								item: data.id,             // The parent item ID
								fields: 'category',        // The Many-to-One structural field name
								mode: 'popover'
							})
						}
						href={`/category/${data.category.slug}`}>{data.category.name}</a><span className="breadcrumb-sep">›</span>
					<span className="breadcrumb-current"
						data-directus={
							setAttr({
								collection: 'template',
								item: data.id,
								fields: 'name',
								mode: 'popover'
							})
						}>{data.name}</span>
				</div>
			</div>

			<section className="main">
				<div className="main-inner">

					<div className="col-info">
						<div className="category-pill">{data.category.emoji} {data.category.name}</div>
						<h1 className="product-h1">{data.name}</h1>
						{
							!!data.tagline &&
							<div className="product-tagline" dangerouslySetInnerHTML={{
								__html: data.tagline
							}}></div>
						}

						<div className="rating-row">
							{
								typeof data.rating === 'number'
									? <RatingInput value={data.rating} />
									:
									<>
										<span className="rating-label">New</span>
										<span className="early-label">Be the first to review</span>
									</>

							}
						</div>

						<div className="price-row">
							<FormatCurrency amount={data.price} currency={data.currency}
								currencyClass="price-currency"
								priceClass='price'
							/>
						</div>
						{
							!!data.priceSub &&
							<p className="price-sub">{data.priceSub}</p>
						}

						<div id="order">
							<GetTemplateBtn className="btn-cta" templateId={data.id} />
							{
								!!data.deliveryNote &&
								<div className="delivery-note" dangerouslySetInnerHTML={{
									__html: data.deliveryNote
								}}></div>
							}
						</div>


						{
							!!data.metaList.length &&
							(
								<>
									<div className="divider"></div>
									<ul className="meta-list">
										{data.metaList.map((item) => (
											<li key={item.key} className="meta-item">
												<span className="meta-key">{item.key}</span>
												<span className="meta-val">{item.value}</span>
											</li>
										))}
									</ul>
								</>
							)
						}

						{
							!!data.compatNote &&
							<div className="compat-note" dangerouslySetInnerHTML={{
								__html: data.compatNote
							}}></div>
						}
					</div>

					<div className="col-gallery">
						<Gallery tabs={data.galleryTabs} />
					</div>

				</div>
			</section>

			<div className="below">
				<div className="below-inner">

					{
						!!data.description_html
						&& (
							<>
								<div className="section-divider"></div>
								<p className="section-label">Specifications</p>
								<h2 className="section-title">Document and Explanation</h2>
								<RichTextRender content={data.description_html} />

								<div className="section-divider"></div>
								<h2 className="section-title">Features Highlight</h2>
								{
									!!data.features?.length
									&& (
										<div className="feature-grid" aria-label="Key features">
											{
												data.features.map((item, index) => (
													<div key={index} className="feature-card" >
														{
															!!item.icon && (
																<div className="feature-icon" aria-hidden="true">
																	<MaterialIcon icon={item.icon} color={'#2ead4b'} />
																</div>
															)
														}
														{
															!!item.label &&
															<div className="feature-label">{item.label}</div>
														}
														{
															!!item.desc &&
															<p className="feature-desc">{item.desc}</p>
														}
													</div>
												))
											}
										</div>
									)
								}
							</>
						)
					}

					{
						!!data.faqs?.length && (
							<>
								<div className="section-divider"></div>
								<p className="section-label">Frequently asked</p>
								<h2 className="section-title">Good questions, real answers</h2>
								<Faq items={data.faqs} />
							</>
						)
					}

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
			</div >

			<div className="sticky-bar" id="sticky-bar" role="complementary" aria-label="Purchase">
				<div>
					<div className="sticky-bar-name">{data.name}</div>
					<div className="sticky-bar-price">
						<FormatCurrency currency={data.currency} amount={data.price} />
					</div>
				</div>
				<GetTemplateBtn className="btn-sticky" templateId={data.id} />
			</div>

		</>
	);
}
