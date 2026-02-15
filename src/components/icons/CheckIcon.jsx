const CheckIcon = ({
  color = "#292D32",
  width = "11",
  height = "8",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 3.83L3.83 6.66L9.5 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
