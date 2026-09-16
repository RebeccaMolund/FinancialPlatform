import { DASHBOARD_BUILTIN_META } from "../data/dashboard-meta";
import type { DashboardBuiltinMetaMap } from "../types/dashboard-meta";

export async function getDashboardBuiltinMeta(): Promise<DashboardBuiltinMetaMap> {
  // Replace this return with a real fetch() call when the API is available.
  return DASHBOARD_BUILTIN_META;
}
