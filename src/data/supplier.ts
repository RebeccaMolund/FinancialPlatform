import type { SupplierPoint } from "../types/supplier";

const TOTAL = 6846500;

export const SUPPLIER_DATA: SupplierPoint[] = [
  { name: "1. Solent", pct: 19.02, color: "#0d9488" },
  { name: "2. Jämtkraft", pct: 17.18, color: "#0f9f96" },
  { name: "3. Nyman", pct: 14.36, color: "#1ab5a8" },
  { name: "4. Falun Energi", pct: 13.4, color: "#5eead4" },
  { name: "5. Peab", pct: 11.53, color: "#99f6e4" },
  { name: "6. Fyrfältet", pct: 7.11, color: "#0f766e" },
  { name: "7. Falu Energi", pct: 6.01, color: "#115e59" },
  { name: "8. Totalentreprenad", pct: 4.93, color: "#134e4a" },
  { name: "9. Fastoc", pct: 4.23, color: "#1a7a6e" },
  { name: "10. CKC", pct: 2.23, color: "#3fb8a8" },
].map((item) => ({
  ...item,
  value: item.pct,
  sek: Math.round((item.pct / 100) * TOTAL),
}));
