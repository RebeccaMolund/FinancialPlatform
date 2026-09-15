import { DASHBOARD_TOP_COSTS_DATA } from "../data/dashboard-top-costs";
import type { DashboardTopCostPoint } from "../types/dashboard-top-cost";

export async function getDashboardTopCostsData(): Promise<
  DashboardTopCostPoint[]
> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_TOP_COSTS_DATA;
}
