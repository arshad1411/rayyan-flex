const DashboardCard = ({
  titleColor,
  title,
  totalAmount,
  taxAmount,
  amountdetails,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h3 className={`text-xl font-medium ${titleColor} mb-3`}>{title}</h3>
      <div
        className={`flex justify-between items-center ${
          amountdetails.length > 0 ? "mb-6" : "mb-0"
        }`}
      >
        <h2 className="text-xl font-medium">₹ {totalAmount}</h2>
        {taxAmount && (
          <p className="text-sm text-[#838383]">
            Tax : ₹ {parseFloat(taxAmount).toFixed(2)}
          </p>
        )}
      </div>

      {amountdetails.length > 0 && (
        <>
          {amountdetails.map((dat, index) => (
            <p
              className="text-base text-[#5a5353] font-medium mb-2"
              key={index}
            >
              {dat.name} : ₹ {dat.value}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default DashboardCard;
