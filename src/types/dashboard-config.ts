export type DashboardBuiltinKey =
  | "spend"
  | "suppliers"
  | "topcosts"
  | "duedate";

export type DashboardChartVariant =
  | "bar"
  | "hbar"
  | "line"
  | "area"
  | "pie"
  | "donut";

export interface DefaultDashboardCard {
  instanceId: string;
  type: "builtin";
  builtinKey: DashboardBuiltinKey;
  variant: DashboardChartVariant;
  color: string;
}
