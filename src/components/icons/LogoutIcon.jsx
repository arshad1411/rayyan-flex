import React from "react";

const LogoutIcon = ({
  color = "#ffffff",
  width = "22",
  height = "22",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.6748 5.66999C6.9073 2.96999 8.2948 1.86749 11.3323 1.86749H11.4298C14.7823 1.86749 16.1248 3.20999 16.1248 6.56249V11.4525C16.1248 14.805 14.7823 16.1475 11.4298 16.1475H11.3323C8.3173 16.1475 6.9298 15.06 6.6823 12.405"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2498 9H2.71484"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.3875 6.48749L1.875 8.99999L4.3875 11.5125"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutIcon;
