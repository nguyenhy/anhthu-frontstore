'use client'
import type { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";

type Props = HTMLAttributes<HTMLButtonElement> & {
  templateId?: string;
};

export const GetTemplateBtn = ({ templateId, ...props }: Props) => {
  const router = useRouter();

  return (
    <button
      {...props}
      disabled={!templateId}
      onClick={() => templateId && router.push(`/order/new?template=${templateId}`)}
    >
      Get This Template
    </button>
  );
};
