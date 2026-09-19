import type { DashboardSupplierPoint } from "../types/dashboard-supplier";
import { getInvoices } from "./invoices";
import { deriveSupplierData } from "./derive-dashboard";

export async function getDashboardSupplierData(): Promise<
  DashboardSupplierPoint[]
> {
  // Derived from the shared invoice dataset (single source of truth).
  return deriveSupplierData(await getInvoices());
}
