const MobileIcon = ({
  width = 18,
  height = 22,
  color = "#292D32",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 6V16C17 20 16 21 12 21H6C2 21 1 20 1 16V6C1 2 2 1 6 1H12C16 1 17 2 17 6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 4.5H7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99922 18.1C9.85526 18.1 10.5492 17.406 10.5492 16.55C10.5492 15.694 9.85526 15 8.99922 15C8.14318 15 7.44922 15.694 7.44922 16.55C7.44922 17.406 8.14318 18.1 8.99922 18.1Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MobileIcon;
