import clsx from "clsx";
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
};

export function StatusBanner({ status }: Props) {
  const config = getOrderStatusConfig(status)
  const { icon, label, desc, variant } = config;

  return (
    <div className={clsx("status-banner", variant)} id="statusBanner">
      <div className="status-icon" id="statusIcon">{icon}</div>
      <div>
        <p className="status-label" id="statusLabel">{label}</p>
        <div className="status-desc" id="statusDesc">
          <MarkdownRenderer content={desc} />
        </div>
      </div>
    </div>
  );
}
