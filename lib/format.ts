/**
 * Small pure formatters used by the UI. Keeping them in one place
 * means we can later swap the locale, currency, or unit convention
 * without touching components.
 */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountPercent(
  price: number,
  original: number | undefined,
): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export function pricePerNightLabel(amount: number): string {
  return `${formatINR(amount)}/night`;
}
