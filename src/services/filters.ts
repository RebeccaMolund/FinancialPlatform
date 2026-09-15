import { FILTERS, FILTER_OPTIONS } from "../data/filters";
import type { FilterDef } from "../types/filters";

export interface FilterConfig {
  filters: FilterDef[];
  options: Record<string, string[]>;
}

export async function getFilterConfig(): Promise<FilterConfig> {
  // Replace this return with a real fetch() call when the API is available.
  return { filters: FILTERS, options: FILTER_OPTIONS };
}
