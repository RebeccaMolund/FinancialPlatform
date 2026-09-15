export interface Insight {
  type: "success" | "warning" | "info";
  text: string;
}

export interface Scenario {
  query: string;
  headline: string;
  summary: string;
  insights: Insight[];
  chart1Title: string;
  chart1Color: string;
  chart2Title: string;
  chart2Color: string;
  chips: string[];
  preFilter?: Partial<Record<string, unknown>>;
}
