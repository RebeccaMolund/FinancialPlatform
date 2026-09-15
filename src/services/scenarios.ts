import { SCENARIOS } from "../data/scenarios";
import type { Scenario } from "../types/analysis";

export async function getScenarios(): Promise<Scenario[]> {
  // Replace this return with a real fetch() call when the API is available.
  return SCENARIOS;
}
