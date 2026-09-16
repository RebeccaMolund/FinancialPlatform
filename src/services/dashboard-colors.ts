import { DASHBOARD_CHART_COLORS } from "../data/dashboard-colors";
import type { DashboardColorPalette } from "../types/dashboard-colors";

export async function getDashboardChartColors(): Promise<DashboardColorPalette> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_CHART_COLORS;
}
