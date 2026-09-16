import { ANALYSIS_CHART_COLORS } from "../data/analysis-colors";
import type { AnalysisColorPalette } from "../types/analysis-colors";

export async function getAnalysisChartColors(): Promise<AnalysisColorPalette> {
  // Replace this return with a real fetch() call when the API is available.
  return ANALYSIS_CHART_COLORS;
}
