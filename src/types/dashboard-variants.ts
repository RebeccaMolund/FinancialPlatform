import type { DashboardChartVariant } from "./dashboard-config";

export type DashboardVariantIcon =
  | "bar"
  | "horizontal"
  | "line"
  | "area"
  | "pie"
  | "donut";

export interface DashboardVariantOption {
  value: DashboardChartVariant;
  label: string;
  icon: DashboardVariantIcon;
}
