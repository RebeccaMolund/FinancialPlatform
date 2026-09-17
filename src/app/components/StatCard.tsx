import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  backgroundColor: string;
  darkMode?: boolean;
}

const DARK_BAND_COLORS: Record<string, string> = {
  "bg-[#fce7f3]": "#472039",
  "bg-[#dbeafe]": "#102b45",
  "bg-[#cefafe]": "#083c45",
  "bg-[#f3e8ff]": "#392653",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  backgroundColor,
  darkMode = false,
}: StatCardProps) {
  const bandColor = darkMode
    ? (DARK_BAND_COLORS[backgroundColor] ?? "var(--md3-surface-high)")
    : undefined;

  return (
    <div className="min-w-0 flex-1 rounded-[12px] overflow-hidden bg-card text-card-foreground flex flex-col border border-border max-sm:flex-row max-sm:items-center max-sm:gap-3 max-sm:px-3 max-sm:py-2.5 lg:min-w-[200px]">
      {/* Colored header band — kompakt ikonplatta på mobil */}
      <div
        className={`${backgroundColor} flex items-center gap-2 max-sm:rounded-[8px] max-sm:size-9 max-sm:justify-center max-sm:shrink-0 sm:px-4 sm:py-3`}
        style={darkMode ? { backgroundColor: bandColor } : undefined}
      >
        <Icon
          className="size-4 shrink-0"
          style={{ color: darkMode ? "#f8fafc" : "#364153" }}
          strokeWidth={1.33}
        />
        <span
          className="text-[14px] leading-[20px] whitespace-nowrap max-sm:hidden"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color: darkMode ? "#f8fafc" : "#364153",
          }}
        >
          {title}
        </span>
      </div>
      {/* Semantic body surface with theme-aware foreground and muted text */}
      <div className="flex flex-col justify-between flex-1 bg-card max-sm:flex-row max-sm:items-center max-sm:py-0 sm:px-4 sm:py-6">
        <span
          className="text-[13px] leading-[18px] text-muted-foreground sm:hidden"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {title}
        </span>
        <div className="flex flex-col max-sm:items-end max-sm:gap-0">
          <p
            className="text-[30px] leading-[36px] text-foreground whitespace-nowrap max-sm:text-[16px] max-sm:leading-[22px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            {value}
          </p>
          <p
            className="text-[12px] leading-[16px] text-muted-foreground whitespace-nowrap max-sm:text-[11px] max-sm:leading-[14px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
