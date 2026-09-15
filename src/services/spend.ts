import { SPEND_DATA } from "../data/spend";
import type { SpendPoint } from "../types/spend";

export async function getSpendData(): Promise<SpendPoint[]> {
  // Replace this return with a real fetch() call when the API is available.
  return SPEND_DATA;
}
