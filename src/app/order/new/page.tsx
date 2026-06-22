import { redirect, notFound } from "next/navigation";
import { createDraftOrder, CreateDraftOrderResult } from "@/lib/order/createDraftOrder";
import { OrderError } from "@/lib/order/OrderError";
import ErrorPage from "@/components/errors/ErrorPage";
import { parseErrorConfig } from "@/components/errors/ErrorPageParse";

type Props = {
	searchParams: Promise<{ template?: string }>
}

export default async function NewOrderPage(props: Props) {
	const { template: templateId } = await props.searchParams;
	if (!templateId) {
		return (
			<ErrorPage info={parseErrorConfig(undefined, 400)} />
		)
	}

	let result: CreateDraftOrderResult | null = null
	try {
		result = await createDraftOrder(templateId);
	} catch (error) {
		console.error(new Date().toISOString(), 'NewOrderPage', String(error));
	}

	if (result && result.status === "success") {
		redirect(`/order/${result.slug}`);
	}

	return (
		<ErrorPage info={parseErrorConfig(undefined, 500)} />
	)
}
