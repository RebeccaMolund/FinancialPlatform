import { TOP_COSTS_DATA } from "../data/top-costs";
import type { TopCostPoint } from "../types/top-cost";

export async function getTopCostsData(): Promise<TopCostPoint[]> {
  // Replace this return with a real fetch() call when the API is available.
  return TOP_COSTS_DATA;
}
