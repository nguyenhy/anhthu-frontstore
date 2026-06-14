import clsx from "clsx";
import type { RichText } from "@/components/RichTextRender";
import RichTextRender from "@/components/RichTextRender";

export interface StatusConfig {
  icon: string;
  label: string;
  desc: string;
  variant: string;
}


type Props = {
  config: StatusConfig;
  cmsDesc?: RichText | null;
};

export function StatusBanner({ config, cmsDesc }: Props) {
  const { icon, label, desc, variant } = config;

  return (
    <div className={clsx("status-banner", variant)} id="statusBanner">
      <div className="status-icon" id="statusIcon">{icon}</div>
      <div>
        <p className="status-label" id="statusLabel">{label}</p>
        {cmsDesc
          ? <div className="status-desc" id="statusDesc"><RichTextRender content={cmsDesc} /></div>
          : <p className="status-desc" id="statusDesc">{desc}</p>
        }
      </div>
    </div>
  );
}
