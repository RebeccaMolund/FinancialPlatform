import { DASHBOARD_SUPPLIER_DATA } from "../data/dashboard-supplier";
import type { DashboardSupplierPoint } from "../types/dashboard-supplier";

export async function getDashboardSupplierData(): Promise<
  DashboardSupplierPoint[]
> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_SUPPLIER_DATA;
}
