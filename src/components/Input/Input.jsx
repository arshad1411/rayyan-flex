const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
  required = false,
  readOnly = false,
  disabled = false,
  dontallowDecimal = false,
}) => {
  const handleInputChange = (e) => {
    let newValue = e.target.value;

    if (dontallowDecimal && newValue !== "" && !/^\d+$/.test(newValue)) {
      return;
    }
    onChange(e);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="text-base">{placeholder}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`w-full border border-gray-400 rounded-md mb-2 focus:outline-none pt-1.5 pr-2.5 pb-1 pl-2 h-9 ${className}`}
        required={required}
        autoComplete="off"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
