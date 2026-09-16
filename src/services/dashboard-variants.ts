import { DASHBOARD_VARIANT_OPTIONS } from "../data/dashboard-variants";
import type { DashboardVariantOption } from "../types/dashboard-variants";

export async function getDashboardVariantOptions(): Promise<
  DashboardVariantOption[]
> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_VARIANT_OPTIONS;
}
