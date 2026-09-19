import type { MockRow } from "../types/invoice";
import type { DashboardSupplierPoint } from "../types/dashboard-supplier";
import type { DashboardSpendPoint } from "../types/dashboard-spend";
import type { DashboardTopCostPoint } from "../types/dashboard-top-cost";
import type { DashboardDueDatePoint } from "../types/dashboard-due-date";
import { DASHBOARD_CHART_COLORS } from "../data/dashboard-colors";

// ─── Derivation: all dashboard data is computed from the single invoice
// dataset (getInvoices / MOCK_DATA). These replace the previously hardcoded
// DASHBOARD_* constants so every page shows the same truth. ───────────────────

const MONTHS_SV = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

function shortName(leverantor: string): string {
  return leverantor.split(" ")[0];
}

/** Totalbelopp per leverantör, top 10, with colors from the dashboard palette. */
export function deriveSupplierData(rows: MockRow[]): DashboardSupplierPoint[] {
  const bySupplier = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.leverantor] = (acc[r.leverantor] || 0) + r.radbelopp;
    return acc;
  }, {});
  return Object.entries(bySupplier)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([k, v], i) => ({
      k: shortName(k),
      v: Math.round(v),
      c: DASHBOARD_CHART_COLORS[i % DASHBOARD_CHART_COLORS.length],
    }));
}

/** Spend per month, split by valuta (SEK vs EUR). */
export function deriveSpendData(rows: MockRow[]): DashboardSpendPoint[] {
  const byMonth = new Map<
    string,
    { SEK: number; EUR: number; order: number }
  >();
  for (const r of rows) {
    const d = new Date(r.fakturadatum);
    if (isNaN(d.getTime())) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    const entry = byMonth.get(key) ?? { SEK: 0, EUR: 0, order: d.getTime() };
    if (r.valuta === "EUR") entry.EUR += r.radbelopp;
    else entry.SEK += r.radbelopp;
    byMonth.set(key, entry);
  }
  return [...byMonth.entries()]
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, v]) => {
      const monthIdx = Number(key.split("-")[1]);
      return {
        k: MONTHS_SV[monthIdx],
        SEK: Math.round(v.SEK),
        EUR: Math.round(v.EUR),
      };
    });
}

/** Top kostnader per artikel, top 8. */
export function deriveTopCostsData(rows: MockRow[]): DashboardTopCostPoint[] {
  const byArticle = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.artikel] = (acc[r.artikel] || 0) + r.radbelopp;
    return acc;
  }, {});
  return Object.entries(byArticle)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, v]) => ({ k, v: Math.round(v) }));
}

const DUE_BUCKETS = [
  "Förfallen",
  "0–7 dagar",
  "8–30 dagar",
  "31–60 dagar",
  "60+ dagar",
];

function dueBucket(forfallodatum: string): string {
  const days = Math.ceil(
    (new Date(forfallodatum).getTime() - Date.now()) / 86_400_000,
  );
  if (days < 0) return DUE_BUCKETS[0];
  if (days <= 7) return DUE_BUCKETS[1];
  if (days <= 30) return DUE_BUCKETS[2];
  if (days <= 60) return DUE_BUCKETS[3];
  return DUE_BUCKETS[4];
}

/** Antal fakturor per förfalloperiod. */
export function deriveDueDateData(rows: MockRow[]): DashboardDueDatePoint[] {
  const byBucket = rows.reduce<Record<string, number>>((acc, r) => {
    const b = dueBucket(r.forfallodatum);
    acc[b] = (acc[b] || 0) + 1;
    return acc;
  }, {});
  return DUE_BUCKETS.filter((b) => byBucket[b] !== undefined).map((b) => ({
    k: b,
    v: byBucket[b],
  }));
}

export interface DashboardKpis {
  totalKostnader: number;
  antalFakturor: number;
  forfaller30: number;
  aktivaLeverantorer: number;
}

/** KPI-värden för dashboardens stat-kort, beräknade från fakturorna. */
export function deriveKpis(rows: MockRow[]): DashboardKpis {
  const totalKostnader = rows.reduce((s, r) => s + r.radbelopp, 0);
  const aktivaLeverantorer = new Set(rows.map((r) => r.leverantor)).size;
  const forfaller30 = rows.filter((r) => {
    const days = Math.ceil(
      (new Date(r.forfallodatum).getTime() - Date.now()) / 86_400_000,
    );
    return days >= 0 && days <= 30;
  }).length;
  return {
    totalKostnader,
    antalFakturor: rows.length,
    forfaller30,
    aktivaLeverantorer,
  };
}
