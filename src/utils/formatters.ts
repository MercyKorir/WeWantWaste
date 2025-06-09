export const formatPrice = (
  priceBeforeVat: number,
  vatRate: number
): string => {
  const totalPrice = priceBeforeVat * (1 + vatRate / 100);
  return `£${totalPrice.toFixed(2)}`;
};

export const formatPriceWithVat = (priceBeforeVat: number, vatRate: number) => {
  const vatAmount = priceBeforeVat * (vatRate / 100);
  const totalPrice = priceBeforeVat + vatAmount;

  return {
    beforeVat: `£${priceBeforeVat.toFixed(2)}`,
    vatAmount: `£${vatAmount.toFixed(2)}`,
    total: `£${totalPrice.toFixed(2)}`,
  };
};

export const getSkipDisplayName = (size: number): string => {
  return `${size} Yard Skip`;
};

export const getHirePeriodText = (days: number): string => {
  if (days % 7 === 0) return `${days / 7} week hire period`;
  return `${days} day hire period`;
};
