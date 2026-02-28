import { Autocomplete } from "@mui/joy";

const AutocompleteField = ({
  label,
  value = "",
  onChange,
  options = [],
  onInputChange,
  onBlur,
  required,
  disabled,
}) => {
  return (
    <div className="w-full">
      <label className="text-base font-semibold">{label}</label>
      <Autocomplete
        freeSolo
        options={options.filter(Boolean)}
        value={value}
        onChange={onChange}
        onInputChange={onInputChange}
        onBlur={onBlur}
        placeholder={label}
        getOptionLabel={(option) => (option ? String(option) : "")}
        sx={{
          border: "1px solid #9ea5b2",
          borderRadius: "6px",
          height: "36px",
          background: "#fff",
          boxShadow: "none",
        }}
        slotProps={{
          input: {
            autoComplete: "off",
          },
        }}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default AutocompleteField;
