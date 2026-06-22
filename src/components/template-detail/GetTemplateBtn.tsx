'use client'
import type { HTMLAttributes } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = HTMLAttributes<HTMLButtonElement> & {
  templateId?: string;
};

export const GetTemplateBtn = ({ templateId, ...props }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!templateId || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const json = await res.json();
      if (res.ok && json.slug) {
        router.push(`/order/${json.slug}`);
      } else {
        alert(json.message ?? "Something went wrong. Please try again");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      {...props}
      disabled={!templateId || loading}
      onClick={handleClick}
    >
      {loading ? "Please wait…" : "Get This Template"}
    </button>
  );
};
