export const formattedAmount = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(amount);
};
