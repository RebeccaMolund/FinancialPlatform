import { DASHBOARD_SPEND_DATA } from "../data/dashboard-spend";
import type { DashboardSpendPoint } from "../types/dashboard-spend";

export async function getDashboardSpendData(): Promise<DashboardSpendPoint[]> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_SPEND_DATA;
}
