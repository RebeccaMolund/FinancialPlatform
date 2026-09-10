import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  backgroundColor: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  backgroundColor,
}: StatCardProps) {
  return (
    <div
      className={`flex-1 min-w-[215px] rounded-[12px] overflow-hidden bg-white flex flex-col`}
    >
      {/* Colored header band */}
      <div className={`${backgroundColor} flex items-center gap-2 px-4 py-3`}>
        <Icon
          className="size-4 shrink-0"
          style={{ color: "#364153" }}
          strokeWidth={1.33}
        />
        <span
          className="text-[14px] leading-[20px] text-[#364153] whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {title}
        </span>
      </div>
      {/* White body with value */}
      <div className="flex flex-col justify-between px-4 py-6 flex-1">
        <p
          className="text-[30px] leading-[36px] text-[#101828] whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          {value}
        </p>
        <p
          className="text-[12px] leading-[16px] text-[#6a7282] whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
