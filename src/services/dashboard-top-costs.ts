import type { DashboardTopCostPoint } from "../types/dashboard-top-cost";
import { getInvoices } from "./invoices";
import { deriveTopCostsData } from "./derive-dashboard";

export async function getDashboardTopCostsData(): Promise<
  DashboardTopCostPoint[]
> {
  // Derived from the shared invoice dataset (single source of truth).
  return deriveTopCostsData(await getInvoices());
}
