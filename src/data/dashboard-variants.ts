import type { DashboardVariantOption } from "../types/dashboard-variants";

export const DASHBOARD_VARIANT_OPTIONS: DashboardVariantOption[] = [
  { value: "bar", label: "Stapel", icon: "bar" },
  { value: "hbar", label: "Horisontell", icon: "horizontal" },
  { value: "line", label: "Linje", icon: "line" },
  { value: "area", label: "Area", icon: "area" },
  { value: "pie", label: "Tårta", icon: "pie" },
  { value: "donut", label: "Munkring", icon: "donut" },
];
