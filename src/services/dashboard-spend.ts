import type { DashboardSpendPoint } from "../types/dashboard-spend";
import { getInvoices } from "./invoices";
import { deriveSpendData } from "./derive-dashboard";

export async function getDashboardSpendData(): Promise<DashboardSpendPoint[]> {
  // Derived from the shared invoice dataset (single source of truth).
  return deriveSpendData(await getInvoices());
}
