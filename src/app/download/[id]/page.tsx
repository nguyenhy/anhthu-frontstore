import { redirect } from 'next/navigation';
import { HttpError } from "@/lib/error";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchOrderDetailForDownload, OrderDetailForDownload } from "@/lib/order/fetchOrderDetailForDownload";
import { createLogger } from "@/lib/logger";

type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Download",
		robots: { index: false, follow: false },
	};
}

export default async function Download(props: Props) {
	const logger = createLogger()
	const params = await props.params
	let detail: OrderDetailForDownload | null = null
	try {
		detail = await fetchOrderDetailForDownload(params.id)
	} catch (error) {
		logger.info(['Download', String(error)])
		throw new HttpError('500')
	}

	if (!detail) {
		logger.info(['Download.empty'])
		notFound()
	}

	if (!Array.isArray(detail.order_fulfillment) || !detail.order_fulfillment[0]?.date_created) {
		logger.info(['Download.order_fulfillment'])
		notFound()
	}

	let url: URL | null = null

	const raw = detail.template?.product?.url
	if (raw) {
		try {
			url = new URL(raw)
		} catch {
		}
	}

	if (!url) {
		logger.info(['Download.url'])
		notFound()
	}

	return redirect(url.toString())
}
