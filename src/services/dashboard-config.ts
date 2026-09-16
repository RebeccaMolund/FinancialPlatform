import { DEFAULT_DASHBOARD_CARDS } from "../data/default-dashboard-cards";
import type { DefaultDashboardCard } from "../types/dashboard-config";

export async function getDefaultDashboardCards(): Promise<
  DefaultDashboardCard[]
> {
  // Replace this return with a real fetch() call when the API is available.
  return DEFAULT_DASHBOARD_CARDS;
}
