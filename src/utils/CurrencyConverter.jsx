const CurrencyConverter = ({ amount, classes }) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(amount);

  return (
    <span
      className={`font-bold border border-[#9e77d2] w-full px-2 py-1 rounded-lg ${classes}`}
    >
      {formattedAmount}
    </span>
  );
};

export default CurrencyConverter;
