import type { DashboardBuiltinMetaMap } from "../types/dashboard-meta";

export const DASHBOARD_BUILTIN_META: DashboardBuiltinMetaMap = {
  spend: {
    title: "Spend-analys historisk (per valuta)",
    defaultVariant: "bar",
    description: "Månatlig spend uppdelat på SEK/EUR",
  },
  suppliers: {
    title: "Totalbelopp per leverantör – Top 10",
    defaultVariant: "donut",
    description: "De 10 största leverantörerna per belopp",
  },
  topcosts: {
    title: "10 största kostnader – Artikelnivå",
    defaultVariant: "hbar",
    description: "Dyraste artiklar sorterade efter kostnad",
  },
  duedate: {
    title: "Kommande per förfallodag",
    defaultVariant: "area",
    description: "Fakturor som förfaller framöver",
  },
};
