import { DASHBOARD_DUE_DATE_DATA } from "../data/dashboard-due-date";
import type { DashboardDueDatePoint } from "../types/dashboard-due-date";

export async function getDashboardDueDateData(): Promise<
  DashboardDueDatePoint[]
> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_DUE_DATE_DATA;
}
