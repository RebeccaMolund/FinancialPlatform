export interface Insight {
  type: "success" | "warning" | "info";
  text: string;
}

export type ChartDimension =
  | "leverantor"
  | "kategori"
  | "fakturaformat"
  | "forfallodatum";

export type ChartMetric = "radbelopp" | "antal" | "count";

export interface ChartSpec {
  /** Leading part of the derived chart title, e.g. "Fakturor". */
  subject: string;
  /** MockRow field the chart groups by — the title is derived from this. */
  groupBy: ChartDimension;
  /** Aggregation: sum radbelopp, sum antal, or count rows. */
  metric: ChartMetric;
}

export interface Scenario {
  query: string;
  headline: string;
  summary: string;
  insights: Insight[];
  chart1: ChartSpec;
  chart1Color: string;
  chart2Title: string;
  chart2Color: string;
  chips: string[];
  preFilter?: Partial<Record<string, unknown>>;
}
