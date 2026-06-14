import OrderDetail from "@/components/order/OrderDetail";
import { HttpError } from "@/lib/error";
import { type OrderPageData } from "@/lib/order/types";
import { fetchOrderDetail } from "@/lib/order/mockOrderDetail";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
	props: {},
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {

	};
}

export default async function Order(props: Props) {
	const params = await props.params
	let detail: OrderPageData | null = null
	try {
		detail = await fetchOrderDetail(params.id)
	} catch (error) {
		console.error(error);
		throw new HttpError('500')
	}

	if (!detail) {
		notFound()
	}

	return (
		<>
			<OrderDetail data={detail} />
		</>
	);
}
