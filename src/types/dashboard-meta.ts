import type {
  DashboardBuiltinKey,
  DashboardChartVariant,
} from "./dashboard-config";

export interface DashboardBuiltinMeta {
  title: string;
  defaultVariant: DashboardChartVariant;
  description: string;
}

export type DashboardBuiltinMetaMap = Record<
  DashboardBuiltinKey,
  DashboardBuiltinMeta
>;
