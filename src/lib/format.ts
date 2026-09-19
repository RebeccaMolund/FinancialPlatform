/**
 * Shared currency formatting for the whole app (Swedish locale).
 *
 * Scheme:
 *  - |amount| >= 1 000 000  -> abbreviated millions, one decimal: "2,5 M kr"
 *  - otherwise             -> grouped with spaces, no decimals: "476 300 kr"
 *
 * Only display formatting — the underlying numbers are never changed.
 */
export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000) {
    const millions = (amount / 1_000_000).toLocaleString("sv-SE", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${millions} M kr`;
  }
  return `${Math.round(amount).toLocaleString("sv-SE")} kr`;
}
