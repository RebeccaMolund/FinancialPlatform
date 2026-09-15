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
    <div className="flex-1 min-w-[215px] rounded-[12px] overflow-hidden bg-card text-card-foreground flex flex-col border border-border">
      {/* Colored header band */}
      <div
        className={`${backgroundColor} flex items-center gap-2 px-4 py-3`}
        style={darkMode ? { backgroundColor: bandColor } : undefined}
      >
        <Icon
          className="size-4 shrink-0"
          style={{ color: darkMode ? "#f8fafc" : "#364153" }}
          strokeWidth={1.33}
        />
        <span
          className="text-[14px] leading-[20px] whitespace-nowrap"
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
      <div className="flex flex-col justify-between px-4 py-6 flex-1 bg-card">
        <p
          className="text-[30px] leading-[36px] text-foreground whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          {value}
        </p>
        <p
          className="text-[12px] leading-[16px] text-muted-foreground whitespace-nowrap"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
