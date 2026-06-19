import { fetchFromBff } from "../fetch";
import { getImagePresignedUrl } from "../image/storage";
import { StrapiGalleryTab, StrapiTemplateDetail } from "./types";

export async function fetchTemplateDetail(
  slug: string,
  version?: string,
): Promise<StrapiTemplateDetail | null> {
  const fields = [
    "id",
    "slug",
    "name",

    "category.emoji",
    "category.name",
    "category.slug",

    "tag_line",
    "price_sub",
    "delivery_note",
    "compat_note",

    "meta_list",

    "product.price",
    "product.currency.code",

    "galleries.directus_files_id.filename_disk",
    "galleries.directus_files_id.filename_download",
    "galleries.directus_files_id.width",
    "galleries.directus_files_id.height",
    "galleries.directus_files_id.type",
    "galleries.directus_files_id.description",

    "desc.collection",
    "desc.item:template_desc_block_feature.section_title",
    "desc.item:template_desc_block_feature.title",
    "desc.item:template_desc_block_feature.desc",
    "desc.item:template_desc_block_feature.features",

    "desc.item:template_desc_block_card.section_title",
    "desc.item:template_desc_block_card.title",
    "desc.item:template_desc_block_card.note",
    "desc.item:template_desc_block_card.note_icon",
    "desc.item:template_desc_block_card.cards",

    "desc.item:template_desc_block_faq.section_title",
    "desc.item:template_desc_block_faq.title",
    "desc.item:template_desc_block_faq.faqs",

    "early_offer.section_title",
    "early_offer.title",
    "early_offer.desc",
    "early_offer.notes",
    "early_offer.coupon.type",
    "early_offer.coupon.amount",
    "early_offer.coupon.currency.code",
    "early_offer.coupon.cap_value",
    "early_offer.coupon.can_expired",
    "early_offer.coupon.expires_at",
  ];
  const search = new URLSearchParams();
  if (version) {
    search.append("version", version);
  }
  search.append("filter[slug][_eq]", slug);
  search.append("limit", "1");
  search.append("fields", fields.join(","));

  const res = await fetchFromBff(`/items/template?${search.toString()}`);

  if (!res.ok) {
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw = json?.data?.[0];
  console.log(raw);

  if (!raw) {
    throw new Error(`template not found slug="${slug}"`);
  }

  const galleries = raw.galleries ?? [];
  const galleryTabs: StrapiGalleryTab[] = [];
  for (let index = 0; index < galleries.length; index++) {
    const item = galleries[index];
    const file = item.directus_files_id;
    let url = "";
    try {
      url = await getImagePresignedUrl(file.filename_disk);
    } catch (error) {
      console.error("getImagePresignedUrl", file.filename_disk, error);
    }

    const tab: StrapiGalleryTab = {
      url: url,
      width: file.width,
      height: file.height,
      type: file.type,
      key: file.key,
      label: file.label,
      ariaLabel: file.description,
    };
    galleryTabs.push(tab);
  }

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    category: {
      slug: raw.category.slug,
      name: raw.category.name,
      emoji: raw.category.emoji,
    },
    tagline: raw.tagline,
    price: raw.product.price,
    currency: raw.product.currency.code,
    priceSub: raw.price_sub,
    deliveryNote: raw.delivery_note,
    compatNote: raw.compat_note,
    metaList: raw.meta_list ?? [],
    galleryTabs: galleryTabs,
    description: raw.desc ?? [],
    earlyOffer: raw.early_offer,
  } satisfies StrapiTemplateDetail;
}
