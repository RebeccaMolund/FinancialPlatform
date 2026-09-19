import type { DashboardDueDatePoint } from "../types/dashboard-due-date";
import { getInvoices } from "./invoices";
import { deriveDueDateData } from "./derive-dashboard";

export async function getDashboardDueDateData(): Promise<
  DashboardDueDatePoint[]
> {
  // Derived from the shared invoice dataset (single source of truth).
  return deriveDueDateData(await getInvoices());
}
