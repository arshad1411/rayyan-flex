import React from "react";

const SaveIcon = ({
  color = "#292D32",
  width = "20",
  height = "20",
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
        d="M15.75 5.25V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V5.25C2.25 3 3.375 1.5 6 1.5H12C14.625 1.5 15.75 3 15.75 5.25Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.625 1.5V7.39499C11.625 7.72499 11.235 7.88999 10.995 7.67249L9.25502 6.06752C9.11252 5.93252 8.88748 5.93252 8.74498 6.06752L7.00502 7.67249C6.76502 7.88999 6.375 7.72499 6.375 7.39499V1.5H11.625Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.9375 10.5H13.125"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 13.5H13.125"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SaveIcon;
