const WalletIcon = ({
  color = "#292D32",
  width = "40",
  height = "40",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.0003 31.6667C15.0003 32.9167 14.6503 34.1 14.0337 35.1C12.8837 37.0333 10.767 38.3333 8.33366 38.3333C5.90033 38.3333 3.78366 37.0333 2.63366 35.1C2.017 34.1 1.66699 32.9167 1.66699 31.6667C1.66699 27.9833 4.65033 25 8.33366 25C12.017 25 15.0003 27.9833 15.0003 31.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.73633 31.6659L7.38633 33.3159L10.9363 30.0326"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.586 11.75C29.186 11.6833 28.7693 11.6667 28.336 11.6667H11.6693C11.2027 11.6667 10.7527 11.7 10.3193 11.7667C10.5527 11.3 10.886 10.8667 11.286 10.4667L16.7027 5.03337C18.986 2.76671 22.686 2.76671 24.9693 5.03337L27.886 7.9833C28.9527 9.0333 29.5193 10.3667 29.586 11.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.6663 20V28.3333C36.6663 33.3333 33.333 36.6666 28.333 36.6666H12.7163C13.233 36.2333 13.683 35.7 14.033 35.1C14.6497 34.1 14.9997 32.9166 14.9997 31.6666C14.9997 27.9833 12.0163 25 8.33301 25C6.33301 25 4.54967 25.8833 3.33301 27.2666V20C3.33301 15.4666 6.06634 12.3 10.3163 11.7666C10.7497 11.7 11.1997 11.6666 11.6663 11.6666H28.333C28.7663 11.6666 29.183 11.6833 29.583 11.7499C33.883 12.2499 36.6663 15.4333 36.6663 20Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.6663 20.8334H31.6663C29.833 20.8334 28.333 22.3334 28.333 24.1667C28.333 26 29.833 27.5 31.6663 27.5H36.6663"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WalletIcon;
