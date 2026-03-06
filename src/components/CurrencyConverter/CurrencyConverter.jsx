import { formattedAmount } from "../../utils/FormatAmount";

const CurrencyConverter = ({ amount, classes, label, error }) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-semibold">{label}</p>
      <span
        className={`font-bold border border-[#9e77d2] w-full px-2 py-1 rounded-lg ${classes}`}
      >
        {formattedAmount(amount)}
      </span>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
