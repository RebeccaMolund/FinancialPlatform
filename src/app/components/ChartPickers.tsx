"use client";

import * as React from "react";
import {
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart4,
  AreaChart as AreaChartIcon,
  ChevronDown,
  CircleDashed,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { DashboardChartVariant } from "../../types/dashboard-config";
import type { DashboardVariantIcon } from "../../types/dashboard-variants";

// ─── Shared variant icons ─────────────────────────────────────────────────────

export const VARIANT_ICONS: Record<DashboardVariantIcon, React.ElementType> = {
  bar: BarChart2,
  horizontal: BarChart4,
  line: LineChartIcon,
  area: AreaChartIcon,
  pie: PieChartIcon,
  donut: CircleDashed,
};

// ─── Color picker ────────────────────────────────────────────────────────────

export function ColorPicker({
  current,
  onChange,
  colors,
}: {
  current: string;
  onChange: (c: string) => void;
  colors: string[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex size-[32px] items-center justify-center rounded-[10px] bg-surface-high transition-colors hover:bg-surface-highest"
          title="Byt färg"
          aria-label="Byt färg"
        >
          <span
            className="block size-[20px] rounded-full"
            style={{ backgroundColor: current }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="grid min-w-[136px] grid-cols-4 gap-1 rounded-xl border-0 bg-surface-high p-3"
      >
        {colors.map((c) => (
          <DropdownMenuItem
            key={c}
            onSelect={() => onChange(c)}
            className="size-7 cursor-pointer rounded-full p-0 focus:bg-transparent"
            style={{ backgroundColor: c }}
            aria-label={`Välj färg ${c}`}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Variant picker popover ───────────────────────────────────────────────────

export function VariantPicker({
  current,
  onChange,
  options,
}: {
  current: DashboardChartVariant;
  onChange: (v: DashboardChartVariant) => void;
  options: {
    value: DashboardChartVariant;
    label: string;
    icon: DashboardVariantIcon;
  }[];
}) {
  const CurrentIcon =
    VARIANT_ICONS[options.find((o) => o.value === current)?.icon ?? "bar"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-[32px] items-center gap-1 rounded-[10px] bg-surface-high px-[10px] text-xs text-muted-foreground transition-colors hover:bg-surface-highest"
          title="Byt diagramtyp"
          aria-label="Byt diagramtyp"
        >
          <CurrentIcon className="size-3.5" />
          <ChevronDown className="size-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[130px] rounded-xl border-0 bg-surface-high p-1.5"
      >
        {options.map((opt) => {
          const OptionIcon = VARIANT_ICONS[opt.icon];
          return (
            <DropdownMenuItem
              key={opt.value}
              onSelect={() => onChange(opt.value)}
              className={[
                "flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium",
                current === opt.value
                  ? "bg-[#14b8a6]/15 text-[#14b8a6]"
                  : "text-muted-foreground hover:bg-muted",
              ].join(" ")}
            >
              <OptionIcon className="size-3.5" />
              {opt.label}
              {current === opt.value && <Check className="ml-auto size-3" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
