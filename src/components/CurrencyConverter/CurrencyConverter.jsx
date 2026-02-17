const CurrencyConverter = ({ amount, classes, label, error }) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(amount);

  return (
    <div className="flex flex-col">
      <p className="text-base font-semibold">{label}</p>
      <span
        className={`font-bold border border-[#9e77d2] w-full px-2 py-1 rounded-lg ${classes}`}
      >
        {formattedAmount}
      </span>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
