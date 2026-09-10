import { Currency, Fragrance } from '../types';

export function formatPrice(amount: number, currency: Currency): string {
  switch (currency) {
    case 'USD':
      return `$${Math.round(amount)}`;
    case 'GBP':
      return `£${Math.round(amount)}`;
    case 'EUR':
    default:
      return `${Math.round(amount)} €`;
  }
}

export function getFragrancePrice(
  fragrance: Fragrance,
  currency: Currency,
  sizeMultiplier: number = 1.0
): number {
  const base = fragrance.prices[currency];
  return Math.round(base * sizeMultiplier);
}
