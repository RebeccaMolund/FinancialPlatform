import { useState, useRef, useEffect } from "react";
import {
  Receipt,
  FileText,
  Clock,
  Users,
  Pencil,
  Check,
  X as XIcon,
  Plus,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart4,
  AreaChart as AreaChartIcon,
  GripVertical,
  ChevronDown,
  CircleDashed,
  MoreVertical,
} from "lucide-react";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  startOfMonth,
} from "date-fns";
import type { CurrencyCode, DateRange } from "../components/Header";
import { StatCard } from "../components/StatCard";
import { Card, CardContent } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SavedAnalysis } from "./NyAnalys";
import type { DashboardSpendPoint } from "../../types/dashboard-spend";
import { getDashboardSpendData } from "../../services/dashboard-spend";
import type { DashboardSupplierPoint } from "../../types/dashboard-supplier";
import { getDashboardSupplierData } from "../../services/dashboard-supplier";
import type { DashboardTopCostPoint } from "../../types/dashboard-top-cost";
import { getDashboardTopCostsData } from "../../services/dashboard-top-costs";
import type { DashboardDueDatePoint } from "../../types/dashboard-due-date";
import { getDashboardDueDateData } from "../../services/dashboard-due-date";

// ─── Types ────────────────────────────────────────────────────────────────────

type ChartVariant = "bar" | "hbar" | "line" | "area" | "pie" | "donut";
type BuiltinKey = "spend" | "suppliers" | "topcosts" | "duedate";

interface DashboardCard {
  instanceId: string; // unique per slot
  type: "builtin" | "ai";
  builtinKey?: BuiltinKey;
  analysis?: SavedAnalysis;
  variant: ChartVariant;
  color: string;
}

// ─── Built-in chart data ──────────────────────────────────────────────────────

const BUILTIN_META: Record<
  BuiltinKey,
  { title: string; defaultVariant: ChartVariant; description: string }
> = {
  spend: {
    title: "Spend-analys historisk (per valuta)",
    defaultVariant: "bar",
    description: "Månatlig spend uppdelat på SEK/EUR",
  },
  suppliers: {
    title: "Totalbelopp per leverantör – Top 10",
    defaultVariant: "donut",
    description: "De 10 största leverantörerna per belopp",
  },
  topcosts: {
    title: "10 största kostnader – Artikelnivå",
    defaultVariant: "hbar",
    description: "Dyraste artiklar sorterade efter kostnad",
  },
  duedate: {
    title: "Kommande per förfallodag",
    defaultVariant: "area",
    description: "Fakturor som förfaller framöver",
  },
};

const VARIANT_OPTIONS: {
  value: ChartVariant;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "bar", label: "Stapel", icon: BarChart2 },
  { value: "hbar", label: "Horisontell", icon: BarChart4 },
  { value: "line", label: "Linje", icon: LineChartIcon },
  { value: "area", label: "Area", icon: AreaChartIcon },
  { value: "pie", label: "Tårta", icon: PieChartIcon },
  { value: "donut", label: "Munkring", icon: CircleDashed },
];

// ─── Color palette ────────────────────────────────────────────────────────────

export const CHART_COLORS = [
  "#14b8a6", // teal (brand)
  "#818cf8", // indigo
  "#a78bfa", // purple
  "#fb7185", // rose
  "#f59e0b", // amber
  "#34d399", // emerald
  "#60a5fa", // blue
  "#f97316", // orange
];

function mixHexColors(source: string, target: string, amount: number) {
  const sourceRgb = source
    .match(/[\da-f]{2}/gi)
    ?.map((part) => parseInt(part, 16));
  const targetRgb = target
    .match(/[\da-f]{2}/gi)
    ?.map((part) => parseInt(part, 16));

  if (
    !sourceRgb ||
    sourceRgb.length !== 3 ||
    !targetRgb ||
    targetRgb.length !== 3
  ) {
    return source;
  }

  return `#${sourceRgb
    .map((value, index) =>
      Math.round(value + (targetRgb[index] - value) * amount)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function getColorScale(base: string, count: number) {
  if (count <= 1) return [base];
  if (count === 2) return [base, mixHexColors(base, "#ffffff", 0.65)];

  return Array.from({ length: count }, (_, index) => {
    const amount = index / (count - 1);
    return amount < 0.5
      ? mixHexColors(base, "#000000", (0.5 - amount) * 1.1)
      : mixHexColors(base, "#ffffff", (amount - 0.5) * 1.5);
  });
}

const DEFAULT_CARDS: DashboardCard[] = [
  {
    instanceId: "spend-0",
    type: "builtin",
    builtinKey: "spend",
    variant: "bar",
    color: "#14b8a6",
  },
  {
    instanceId: "suppliers-0",
    type: "builtin",
    builtinKey: "suppliers",
    variant: "donut",
    color: "#14b8a6",
  },
  {
    instanceId: "topcosts-0",
    type: "builtin",
    builtinKey: "topcosts",
    variant: "hbar",
    color: "#14b8a6",
  },
  {
    instanceId: "duedate-0",
    type: "builtin",
    builtinKey: "duedate",
    variant: "area",
    color: "#a78bfa",
  },
];

const DASHBOARD_CARDS_KEY = "financial-dashboard.cards";

function readDashboardCards(): DashboardCard[] {
  try {
    const stored = localStorage.getItem(DASHBOARD_CARDS_KEY);
    const cards = stored ? (JSON.parse(stored) as DashboardCard[]) : null;
    return Array.isArray(cards) && cards.length > 0 ? cards : DEFAULT_CARDS;
  } catch {
    return DEFAULT_CARDS;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtY = (v: number) =>
  v >= 1_000_000
    ? `${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000
      ? `${Math.round(v / 1_000)}k`
      : String(v);

const ttStyle = {
  borderRadius: 10,
  border: "1px solid var(--md3-outline-variant)",
  fontSize: 12,
};
const ttCursor = { fill: "rgba(20,184,166,0.10)" };
const SEK_TO_CURRENCY: Record<CurrencyCode, number> = {
  SEK: 1,
  EUR: 0.09,
  USD: 0.11,
};

function getSpendDataForRange(
  spendData: DashboardSpendPoint[],
  range?: DateRange,
) {
  if (spendData.length === 0) {
    return [];
  }

  if (!range?.start || !range?.end) {
    return spendData;
  }

  const rangeDays = eachDayOfInterval({
    start: range.start,
    end: range.end,
  });

  const rangeMonths = eachMonthOfInterval({
    start: startOfMonth(range.start),
    end: startOfMonth(range.end),
  });

  const days = Math.max(rangeDays.length, 1);
  const rangeMomentum = Math.min(0.35, Math.max(0, days / 45) * 0.35);

  if (rangeMonths.length === 0) {
    return spendData;
  }

  return rangeMonths.map((month, i) => {
    const source = spendData[i % spendData.length];
    const monthLabel = format(month, "MMM");

    return {
      k: monthLabel,
      SEK: Math.round(source.SEK * (1 + rangeMomentum + i * 0.03)),
      EUR: Math.round(source.EUR * (1 + rangeMomentum + i * 0.025)),
    };
  });
}

function convertCurrency(value: number, currency: CurrencyCode) {
  return value * SEK_TO_CURRENCY[currency];
}

function formatCurrency(value: number, currency: CurrencyCode) {
  const number = new Intl.NumberFormat("sv-SE", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(value));

  return `${number} ${currency}`;
}

// ─── Chart renderers — each owns its ResponsiveContainer ─────────────────────
// ResponsiveContainer injects width/height into its *direct* recharts child.
// Wrapping recharts in a custom component breaks that injection, so every
// renderer must wrap itself.

const H = 240; // shared chart height

function UniversalChart({
  data,
  variant,
  colors,
  currency = "SEK",
}: {
  data: { k: string; v: number; c?: string }[];
  variant: ChartVariant;
  colors?: string[];
  currency?: CurrencyCode;
}) {
  const base = colors?.[0] ?? "#14b8a6";
  const colorScale = getColorScale(base, data.length);
  const gradId = `ug-${base.replace("#", "")}`;

  if (variant === "pie" || variant === "donut") {
    const inner = variant === "donut" ? 60 : 0;
    const displayData = data.map((entry) => ({
      ...entry,
      v: convertCurrency(entry.v, currency),
    }));
    const totalValue = displayData.reduce((sum, entry) => sum + entry.v, 0);

    return (
      <div className="flex w-full min-w-0 items-center gap-4 max-[1023px]:flex-col max-[1023px]:items-start">
        <div className="h-[220px] w-[220px] shrink-0 max-[480px]:h-[180px] max-[480px]:w-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                key="uc-pie"
                data={displayData}
                dataKey="v"
                nameKey="k"
                cx="50%"
                cy="50%"
                innerRadius={inner}
                outerRadius={82}
                paddingAngle={2}
                stroke="none"
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              >
                {displayData.map((entry, i) => (
                  <Cell key={`uc-cell-${i}`} fill={colorScale[i]} />
                ))}
              </Pie>
              <text
                x="50%"
                y="49%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fontWeight={700}
                fill="var(--foreground)"
              >
                {formatCurrency(totalValue, currency)}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fill="var(--muted-foreground)"
              >
                Totalt
              </text>
              <Tooltip
                key="uc-tt"
                contentStyle={ttStyle}
                formatter={(v: number, _: string, props: any) => [
                  `${v.toLocaleString("sv-SE")} kr`,
                  props?.payload?.k ?? "",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden max-[1023px]:w-full">
          <div className="flex flex-col gap-1">
            {displayData.map((entry, i) => {
              const pct = totalValue > 0 ? (entry.v / totalValue) * 100 : 0;

              return (
                <div
                  key={`uc-legend-${i}`}
                  className="flex min-w-0 items-center gap-2 text-[11px] leading-none rounded-lg px-1.5 py-1 transition-colors hover:bg-muted"
                >
                  <span
                    className="size-2.5 rounded-sm shrink-0"
                    style={{
                      backgroundColor: colorScale[i],
                    }}
                  />
                  <span className="min-w-0 truncate text-muted-foreground flex-1">
                    {entry.k}
                  </span>
                  <div className="ml-auto shrink-0 flex items-baseline gap-[8px] text-right">
                    <span className="font-medium text-foreground">
                      {formatCurrency(entry.v, currency)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "hbar") {
    return (
      <ResponsiveContainer width="100%" height={H}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 8, right: 16, top: 4, bottom: 0 }}
        >
          <CartesianGrid
            key="uc-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            horizontal={false}
          />
          <XAxis
            key="uc-x"
            type="number"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
          />
          <YAxis
            key="uc-y"
            type="category"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            width={120}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            key="uc-tt"
            cursor={ttCursor}
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Bar key="uc-bar" dataKey="v" fill={base} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (variant === "line") {
    return (
      <ResponsiveContainer width="100%" height={H}>
        <LineChart
          data={data}
          margin={{ left: 0, right: 12, top: 4, bottom: 0 }}
        >
          <CartesianGrid
            key="uc-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            key="uc-x"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="uc-y"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
            width={40}
          />
          <Tooltip
            key="uc-tt"
            cursor={{ stroke: "rgba(20,184,166,0.4)", strokeWidth: 1 }}
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Line
            key="uc-line"
            type="monotone"
            dataKey="v"
            stroke={base}
            strokeWidth={2}
            dot={{ fill: base, r: 3, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (variant === "area") {
    return (
      <ResponsiveContainer width="100%" height={H}>
        <AreaChart
          data={data}
          margin={{ left: 0, right: 12, top: 4, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={base} stopOpacity={0.3} />
              <stop offset="100%" stopColor={base} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            key="uc-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            key="uc-x"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="uc-y"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
            width={40}
          />
          <Tooltip
            key="uc-tt"
            cursor={{ stroke: "rgba(20,184,166,0.4)", strokeWidth: 1 }}
            contentStyle={ttStyle}
            formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
          />
          <Area
            key="uc-area"
            type="monotone"
            dataKey="v"
            stroke={base}
            strokeWidth={2}
            fill={`url(#${gradId})`}
            dot={{ fill: base, r: 3, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={H}>
      <BarChart
        data={data}
        barCategoryGap="30%"
        margin={{ left: 0, right: 12, top: 4, bottom: 0 }}
      >
        <CartesianGrid
          key="uc-cg"
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          key="uc-x"
          dataKey="k"
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <YAxis
          key="uc-y"
          tick={{ fill: "#9ca3af", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtY}
          width={40}
        />
        <Tooltip
          key="uc-tt"
          cursor={ttCursor}
          contentStyle={ttStyle}
          formatter={(v: number) => [v.toLocaleString("sv-SE"), ""]}
        />
        <Bar key="uc-bar" dataKey="v" fill={base} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function SpendChart({
  variant,
  color = "#14b8a6",
  range,
  currency = "SEK",
  spendData,
}: {
  variant: ChartVariant;
  color?: string;
  range?: { start: Date | null; end: Date | null };
  currency?: CurrencyCode;
  spendData: DashboardSpendPoint[];
}) {
  const visibleSpend = getSpendDataForRange(spendData, range).map((entry) => ({
    ...entry,
    SEK: convertCurrency(entry.SEK, currency),
    EUR: convertCurrency(entry.EUR, currency),
  }));

  if (variant === "pie" || variant === "donut") {
    const agg = [
      {
        k: "SEK",
        v: visibleSpend.reduce((s, d) => s + d.SEK, 0),
      },
      {
        k: "EUR",
        v: visibleSpend.reduce((s, d) => s + d.EUR, 0),
      },
    ];
    return (
      <UniversalChart
        data={agg}
        variant={variant}
        colors={getColorScale(color, 2)}
      />
    );
  }
  if (variant === "hbar") {
    const agg = visibleSpend.map((d) => ({ k: d.k, v: d.SEK + d.EUR }));
    return <UniversalChart data={agg} variant="hbar" colors={[color]} />;
  }
  const m = { left: 0, right: 12, top: 4, bottom: 0 };
  if (variant === "line") {
    return (
      <ResponsiveContainer width="100%" height={H}>
        <LineChart data={visibleSpend} margin={m}>
          <CartesianGrid
            key="sc-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            key="sc-x"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="sc-y"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
            width={40}
          />
          <Tooltip key="sc-tt" cursor={ttCursor} contentStyle={ttStyle} />
          <Legend
            key="sc-legend"
            wrapperStyle={{ fontSize: 11 }}
            iconType="square"
          />
          <Line
            key="sc-sek"
            type="monotone"
            dataKey="SEK"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            key="sc-eur"
            type="monotone"
            dataKey="EUR"
            stroke={getColorScale(color, 2)[1]}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  if (variant === "area") {
    return (
      <ResponsiveContainer width="100%" height={H}>
        <AreaChart data={visibleSpend} margin={m}>
          <defs>
            <linearGradient
              id={`spend-sek-${color.replace("#", "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id={`spend-eur-${color.replace("#", "")}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={getColorScale(color, 2)[1]}
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor={getColorScale(color, 2)[1]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            key="sc-cg"
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            key="sc-x"
            dataKey="k"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            key="sc-y"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtY}
            width={40}
          />
          <Tooltip key="sc-tt" cursor={ttCursor} contentStyle={ttStyle} />
          <Legend
            key="sc-legend"
            wrapperStyle={{ fontSize: 11 }}
            iconType="square"
          />
          <Area
            key="sc-sek"
            type="monotone"
            dataKey="SEK"
            stroke={color}
            strokeWidth={2}
            fill={`url(#spend-sek-${color.replace("#", "")})`}
          />
          <Area
            key="sc-eur"
            type="monotone"
            dataKey="EUR"
            stroke={getColorScale(color, 2)[1]}
            strokeWidth={2}
            fill={`url(#spend-eur-${color.replace("#", "")})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  // bar (default)
  return (
    <ResponsiveContainer width="100%" height={H}>
      <BarChart data={visibleSpend} barCategoryGap="25%" margin={m}>
        <CartesianGrid
          key="sc-cg"
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          key="sc-x"
          dataKey="k"
          tick={{ fill: "#6b7280", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          key="sc-y"
          tick={{ fill: "#9ca3af", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={fmtY}
          width={40}
        />
        <Tooltip key="sc-tt" cursor={ttCursor} contentStyle={ttStyle} />
        <Legend
          key="sc-legend"
          wrapperStyle={{ fontSize: 11 }}
          iconType="square"
        />
        <Bar key="sc-sek" dataKey="SEK" fill={color} radius={[4, 4, 0, 0]} />
        <Bar
          key="sc-eur"
          dataKey="EUR"
          fill={getColorScale(color, 2)[1]}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function getRangeMultiplier(range?: DateRange) {
  if (!range?.start || !range?.end) {
    return 1;
  }

  const days = eachDayOfInterval({
    start: range.start,
    end: range.end,
  });

  const dayCount = Math.max(days.length, 1);
  return Math.min(2, 1 + Math.max(dayCount - 30, 0) / 60);
}

function getBuiltinData(
  key: BuiltinKey,
  range?: DateRange,
  spendData: DashboardSpendPoint[] = [],
  supplierData: DashboardSupplierPoint[] = [],
  topCostsData: DashboardTopCostPoint[] = [],
  dueDateData: DashboardDueDatePoint[] = [],
): { k: string; v: number; c?: string }[] {
  const multiplier = getRangeMultiplier(range);

  switch (key) {
    case "spend":
      return spendData.map((d) => ({ k: d.k, v: d.SEK + d.EUR }));
    case "suppliers":
      return supplierData.map((d) => ({
        ...d,
        v: Math.round(d.v * multiplier),
      }));
    case "topcosts":
      return topCostsData.map((d) => ({
        ...d,
        v: Math.round(d.v * multiplier),
      }));
    case "duedate":
      return dueDateData.map((d) => ({
        ...d,
        v: Math.round(d.v * multiplier),
      }));
  }
}

// ─── Color picker ────────────────────────────────────────────────────────────

function ColorPicker({
  current,
  onChange,
}: {
  current: string;
  onChange: (c: string) => void;
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
        {CHART_COLORS.map((c) => (
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

function VariantPicker({
  current,
  onChange,
}: {
  current: ChartVariant;
  onChange: (v: ChartVariant) => void;
}) {
  const CurrentIcon =
    VARIANT_OPTIONS.find((o) => o.value === current)?.icon ?? BarChart2;
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
        {VARIANT_OPTIONS.map((opt) => (
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
            <opt.icon className="size-3.5" />
            {opt.label}
            {current === opt.value && <Check className="ml-auto size-3" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Single dashboard chart card ──────────────────────────────────────────────

function ChartCard({
  card,
  editMode,
  isDragOver,
  darkMode,
  onRemove,
  onVariantChange,
  onColorChange,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  range,
  currency,
  spendData,
  supplierData,
  topCostsData,
  dueDateData,
}: {
  card: DashboardCard;
  editMode: boolean;
  isDragOver: boolean;
  darkMode?: boolean;
  onRemove: () => void;
  onVariantChange: (v: ChartVariant) => void;
  onColorChange: (c: string) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: () => void;
  range?: DateRange;
  currency: CurrencyCode;
  spendData: DashboardSpendPoint[];
  supplierData: DashboardSupplierPoint[];
  topCostsData: DashboardTopCostPoint[];
  dueDateData: DashboardDueDatePoint[];
}) {
  const title =
    card.type === "builtin"
      ? BUILTIN_META[card.builtinKey!].title
      : card.analysis!.chart1Title;
  function renderChart() {
    if (card.type === "builtin") {
      if (card.builtinKey === "spend") {
        return (
          <SpendChart
            variant={card.variant}
            color={card.color}
            range={range}
            currency={currency}
            spendData={spendData}
          />
        );
      }
      return (
        <UniversalChart
          data={getBuiltinData(
            card.builtinKey!,
            range,
            spendData,
            supplierData,
            topCostsData,
            dueDateData,
          )}
          variant={card.variant}
          colors={[card.color]}
          currency={currency}
        />
      );
    }
    // AI card
    const a = card.analysis!;
    return (
      <UniversalChart
        data={a.chart1Data}
        variant={card.variant}
        colors={[card.color]}
        currency={currency}
      />
    );
  }

  return (
    <div
      draggable={editMode}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      className={[
        "relative transition-all duration-200",
        editMode ? "cursor-grab active:cursor-grabbing" : "",
        isDragOver ? "scale-[1.02] ring-2 ring-[#14b8a6]/40 rounded-2xl" : "",
      ].join(" ")}
    >
      {/* Matches Figma: bg-white rounded-[12px] h-[326px] p-[20px] gap-[8px] */}
      <Card className="h-[326px] border-none shadow-none bg-card max-[1023px]:h-auto max-[1023px]:min-h-[326px]">
        <CardContent className="p-[20px] flex flex-col gap-[8px] h-full">
          {/* Card header — h-[32px], matches Figma exactly */}
          <div className="flex items-center justify-between h-[32px] shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              {editMode && (
                <GripVertical className="size-4 text-muted-foreground shrink-0" />
              )}
              <p
                className="truncate text-[16px] leading-[1.38] text-foreground"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.016px",
                }}
              >
                {title}
              </p>
            </div>
            {/* Controls: gap-[6px], matching Figma exactly */}
            <div className="flex items-center gap-[6px] shrink-0">
              <ColorPicker current={card.color} onChange={onColorChange} />
              <VariantPicker
                current={card.variant}
                onChange={onVariantChange}
              />
              {editMode && (
                <button
                  onClick={onRemove}
                  className="size-[32px] flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <XIcon className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {renderChart()}

          {card.type === "ai" && card.analysis && (
            <p className="text-xs text-muted-foreground mt-2 truncate">
              Från: {card.analysis.name} · {card.analysis.resultCount} rader
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Add diagram panel ────────────────────────────────────────────────────────

function AddDiagramPanel({
  savedAnalyses,
  onAdd,
  onClose,
  darkMode,
}: {
  savedAnalyses: SavedAnalysis[];
  onAdd: (card: DashboardCard) => void;
  onClose: () => void;
  darkMode?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />
      <div
        className={[
          "relative rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto",
          "bg-card border border-border",
        ].join(" ")}
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={[
            "sticky top-0 rounded-t-3xl px-6 py-4 flex items-center justify-between border-b z-10",
            "bg-card border-border",
          ].join(" ")}
        >
          <h2 className="text-base font-semibold text-foreground">
            Lägg till diagram
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        {/* Standard charts */}
        <div className="px-6 mt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Standarddiagram
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(
              Object.entries(BUILTIN_META) as [
                BuiltinKey,
                (typeof BUILTIN_META)[BuiltinKey],
              ][]
            ).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => {
                  onAdd({
                    instanceId: `${key}-${Date.now()}`,
                    type: "builtin",
                    builtinKey: key,
                    variant: meta.defaultVariant,
                    color: "#14b8a6",
                  });
                  onClose();
                }}
                className="flex items-start gap-3 p-4 bg-muted hover:bg-[#14b8a6]/10 border border-border hover:border-[#14b8a6]/30 rounded-2xl transition-colors text-left group"
              >
                <div className="size-9 rounded-xl bg-[#14b8a6]/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#14b8a6]/25 transition-colors">
                  <BarChart2 className="size-4 text-[#14b8a6]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {meta.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {meta.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI analyses */}
        {savedAnalyses.length > 0 && (
          <div className="px-6 mt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Mina AI-analyser
            </p>
            <div className="flex flex-col gap-2">
              {savedAnalyses.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    onAdd({
                      instanceId: `ai-${a.id}-${Date.now()}`,
                      type: "ai",
                      analysis: a,
                      variant: "bar",
                      color: a.chart1Color ?? "#14b8a6",
                    });
                    onClose();
                  }}
                  className="flex items-center gap-3 px-4 py-3 bg-muted hover:bg-[#14b8a6]/10 border border-border hover:border-[#14b8a6]/30 rounded-xl transition-colors text-left"
                >
                  <div className="size-8 rounded-lg bg-[#14b8a6]/15 flex items-center justify-center shrink-0">
                    <BarChart2 className="size-4 text-[#14b8a6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {a.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.chart1Title} · {a.resultCount} rader
                    </p>
                  </div>
                  <Plus className="size-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {savedAnalyses.length === 0 && (
          <p className="px-6 mt-4 text-sm text-muted-foreground">
            Spara analyser i AI analys för att kunna lägga till dem här.
          </p>
        )}
        <div className="h-6" />
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

interface Props {
  savedAnalyses: SavedAnalysis[];
  pendingAnalysis?: SavedAnalysis | null;
  onPendingConsumed?: () => void;
  darkMode?: boolean;
  editMode?: boolean;
  onEditModeChange?: (v: boolean) => void;
  range?: DateRange;
  currency?: CurrencyCode;
}

export function Dashboard({
  savedAnalyses,
  pendingAnalysis,
  onPendingConsumed,
  darkMode,
  editMode: externalEditMode,
  onEditModeChange,
  range,
  currency = "SEK",
}: Props) {
  const [cards, setCards] = useState<DashboardCard[]>(readDashboardCards);
  const [spendData, setSpendData] = useState<DashboardSpendPoint[]>([]);
  const [supplierData, setSupplierData] = useState<DashboardSupplierPoint[]>(
    [],
  );
  const [topCostsData, setTopCostsData] = useState<DashboardTopCostPoint[]>([]);
  const [dueDateData, setDueDateData] = useState<DashboardDueDatePoint[]>([]);
  const selectedRange = range ?? {
    start: new Date(2025, 6, 17),
    end: new Date(2025, 7, 17),
  };
  const rangeDays =
    selectedRange.start && selectedRange.end
      ? eachDayOfInterval({
          start: selectedRange.start,
          end: selectedRange.end,
        })
      : [];
  const activeMonth = selectedRange.start
    ? format(selectedRange.start, "MMM")
    : "Jul";
  // editMode is driven externally (from Header "Redigera dashboard") but also toggleable internally
  const editMode = externalEditMode ?? false;
  function setEditMode(v: boolean | ((prev: boolean) => boolean)) {
    const next = typeof v === "function" ? v(editMode) : v;
    onEditModeChange?.(next);
  }
  const [showAddPanel, setShowAddPanel] = useState(false);
  const draggedId = useRef<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getDashboardSpendData().then((data) => {
      if (active) setSpendData(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getDashboardSupplierData().then((data) => {
      if (active) setSupplierData(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getDashboardTopCostsData().then((data) => {
      if (active) setTopCostsData(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getDashboardDueDateData().then((data) => {
      if (active) setDueDateData(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DASHBOARD_CARDS_KEY, JSON.stringify(cards));
    } catch {
      // Storage can be unavailable in private browsing or restricted embeds.
    }
  }, [cards]);

  function updateVariant(instanceId: string, variant: ChartVariant) {
    setCards((prev) =>
      prev.map((c) => (c.instanceId === instanceId ? { ...c, variant } : c)),
    );
  }

  function updateColor(instanceId: string, color: string) {
    setCards((prev) =>
      prev.map((c) => (c.instanceId === instanceId ? { ...c, color } : c)),
    );
  }

  function removeCard(instanceId: string) {
    setCards((prev) => prev.filter((c) => c.instanceId !== instanceId));
  }

  function addCard(card: DashboardCard) {
    setCards((prev) => [...prev, card]);
  }

  // React to analyses pushed from outside (SparadeAnalyser / NyAnalys)
  useEffect(() => {
    if (!pendingAnalysis) return;
    setCards((prev) => [
      ...prev,
      {
        instanceId: `ai-${pendingAnalysis.id}-${Date.now()}`,
        type: "ai",
        analysis: pendingAnalysis,
        variant: "bar",
        color: pendingAnalysis.chart1Color ?? "#14b8a6",
      },
    ]);
    onPendingConsumed?.();
  }, [pendingAnalysis]);

  function handleDrop(targetId: string) {
    const fromId = draggedId.current;
    if (!fromId || fromId === targetId) {
      setDragOverId(null);
      return;
    }
    setCards((prev) => {
      const arr = [...prev];
      const fi = arr.findIndex((c) => c.instanceId === fromId);
      const ti = arr.findIndex((c) => c.instanceId === targetId);
      const [item] = arr.splice(fi, 1);
      arr.splice(ti, 0, item);
      return arr;
    });
    draggedId.current = null;
    setDragOverId(null);
  }

  const filteredSpend = spendData.map((row, i) => ({
    ...row,
    SEK: Math.round(
      row.SEK * (1 + Math.min(0.35, Math.max(0, rangeDays.length / 45) * 0.35)),
    ),
    EUR: Math.round(
      row.EUR * (1 + Math.min(0.4, Math.max(0, rangeDays.length / 50) * 0.4)),
    ),
  }));

  return (
    <main className="flex-1 overflow-auto px-3 py-4 flex flex-col gap-4 bg-background sm:px-6 sm:py-[24px] sm:gap-[24px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
          Visa intervall:{" "}
          {format(selectedRange.start ?? new Date(), "dd/MM/yyyy")} –{" "}
          {format(selectedRange.end ?? new Date(), "dd/MM/yyyy")}
        </span>
      </div>
      {/* Stat cards — match card semantics while keeping the light pastel header bands */}
      <div className="grid grid-cols-1 gap-3 min-[640px]:grid-cols-2 lg:grid-cols-4 lg:gap-[24px]">
        <StatCard
          title="Kostnader denna månad"
          value="12,5 M kr"
          subtitle="EUR · fakturaladatum"
          icon={Receipt}
          backgroundColor="bg-[#fce7f3]"
          darkMode={Boolean(darkMode)}
        />
        <StatCard
          title="Antal fakturor"
          value="4 312"
          subtitle="denna månad"
          icon={FileText}
          backgroundColor="bg-[#dbeafe]"
          darkMode={Boolean(darkMode)}
        />
        <StatCard
          title="Förfaller inom 30 dgr"
          value="53"
          subtitle="fakturor"
          icon={Clock}
          backgroundColor="bg-[#cefafe]"
          darkMode={Boolean(darkMode)}
        />
        <StatCard
          title="Aktiva leverantörer"
          value="949"
          subtitle="unika"
          icon={Users}
          backgroundColor="bg-[#f3e8ff]"
          darkMode={Boolean(darkMode)}
        />
      </div>

      {/* "Lägg till diagram" button — only in edit mode */}
      {editMode && (
        <div className="flex items-center justify-between -mb-[12px]">
          <span className="text-xs text-muted-foreground">
            Dra för att ändra ordning
          </span>
          <button
            onClick={() => setShowAddPanel(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-[#14b8a6]/15 text-[#14b8a6] border border-[#14b8a6]/30 hover:bg-[#14b8a6]/25 transition-colors"
          >
            <Plus className="size-4" />
            Lägg till diagram
          </button>
        </div>
      )}

      {/* Chart grid — gap-[24px] matching Figma */}
      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-[12px]">
          <p className="text-muted-foreground text-sm mb-3">
            Inga diagram på dashboarden
          </p>
          <button
            onClick={() => {
              setShowAddPanel(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#14b8a6] text-white text-sm font-medium rounded-xl hover:bg-[#0f766e] transition-colors"
          >
            <Plus className="size-4" />
            Lägg till diagram
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-[24px]">
          {cards.map((card) => (
            <ChartCard
              key={card.instanceId}
              card={card}
              editMode={editMode}
              isDragOver={dragOverId === card.instanceId}
              darkMode={darkMode}
              onRemove={() => removeCard(card.instanceId)}
              onVariantChange={(v) => updateVariant(card.instanceId, v)}
              onColorChange={(c) => updateColor(card.instanceId, c)}
              onDragStart={() => {
                draggedId.current = card.instanceId;
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverId(card.instanceId);
              }}
              onDragEnd={() => {
                draggedId.current = null;
                setDragOverId(null);
              }}
              onDrop={() => handleDrop(card.instanceId)}
              range={selectedRange}
              currency={currency}
              spendData={spendData}
              supplierData={supplierData}
              topCostsData={topCostsData}
              dueDateData={dueDateData}
            />
          ))}
        </div>
      )}

      {/* Add diagram panel */}
      {showAddPanel && (
        <AddDiagramPanel
          savedAnalyses={savedAnalyses}
          onAdd={addCard}
          onClose={() => setShowAddPanel(false)}
          darkMode={darkMode}
        />
      )}
    </main>
  );
}
