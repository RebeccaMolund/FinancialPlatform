import { DUE_DATE_DATA } from "../data/due-date";
import type { DueDatePoint } from "../types/due-date";

export async function getDueDateData(): Promise<DueDatePoint[]> {
  // Replace this return with a real fetch() call when the API is available.
  return DUE_DATE_DATA;
}
