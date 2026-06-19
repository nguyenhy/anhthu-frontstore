'use client'
import type { HTMLAttributes } from "react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createDraftOrder } from "@/lib/order/createDraftOrder";

type Props = HTMLAttributes<HTMLButtonElement> & {
  templateId?: string;
};

export const GetTemplateBtn = ({ templateId, ...props }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOrder = useCallback(async () => {
    if (loading || !templateId) return;
    setLoading(true);
    try {
      const result = await createDraftOrder(templateId);
      if (result.status === "success") {
        router.push(`/order/${result.token}`);
      } else {
        // ponytail: alert is intentional fallback — no error UI on this button
        alert(result.message ?? "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }, [loading, templateId, router]);

  return (
    <button {...props} onClick={handleOrder} disabled={loading || !templateId}>
      {loading ? "Loading…" : "Get This Template"}
    </button>
  );
};
