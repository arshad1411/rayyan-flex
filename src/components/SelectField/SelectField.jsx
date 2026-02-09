const SelectField = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  required,
  selectName,
  disabled,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-base">{placeholder}</label>
      <select
        name={selectName}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-400 rounded-md mb-2 focus:outline-none pt-[6px] pr-[10px] pb-[5px] pl-[8px] h-9 ${className}`}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
