import clsx from "clsx";
import type { RichText } from "@/components/RichTextRender";
import RichTextRender from "@/components/RichTextRender";
import { getOrderStatusConfig } from "@/locales/orderStatus";
import { StrapiOrderStatus } from "@/types/strapi";
import MarkdownRenderer from "../MarkdownRenderer";

export interface StatusConfig {
  icon: string;
  label: string;
  desc: string;
  variant: string;
}


type Props = {
  status: StrapiOrderStatus;
  cmsDesc?: RichText | null;
};

export function StatusBanner({ status, cmsDesc }: Props) {
  const config = getOrderStatusConfig(status)
  const { icon, label, desc, variant } = config;

  return (
    <div className={clsx("status-banner", variant)} id="statusBanner">
      <div className="status-icon" id="statusIcon">{icon}</div>
      <div>
        <p className="status-label" id="statusLabel">{label}</p>
        <div className="status-desc" id="statusDesc">
          <MarkdownRenderer content={
            cmsDesc ?
              "Complete payment using the details below. Delivery **within 24h** after payment is confirmed."
              : "Your template has been sent. Check your **email** for the Google Drive access link."
          } />
        </div>
      </div>
    </div>
  );
}
