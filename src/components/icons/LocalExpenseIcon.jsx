import React from "react";

const LocalExpenseIcon = ({
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
        d="M13.53 10.1625C13.215 10.47 13.035 10.9125 13.08 11.385C13.1475 12.195 13.89 12.7875 14.7 12.7875H16.125V13.68C16.125 15.2325 14.8575 16.5 13.305 16.5H4.695C3.1425 16.5 1.875 15.2325 1.875 13.68V8.63251C1.875 7.08001 3.1425 5.8125 4.695 5.8125H13.305C14.8575 5.8125 16.125 7.08001 16.125 8.63251V9.71251H14.61C14.19 9.71251 13.8075 9.87749 13.53 10.1625Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 9.30748V5.88002C1.875 4.98752 2.4225 4.19248 3.255 3.87748L9.21 1.62748C10.14 1.27498 11.1375 1.96501 11.1375 2.96251V5.8125"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9191 10.4776V12.0227C16.9191 12.4352 16.5891 12.7726 16.1691 12.7876H14.6991C13.8891 12.7876 13.1466 12.1951 13.0791 11.3851C13.0341 10.9126 13.2141 10.4701 13.5291 10.1626C13.8066 9.87763 14.1891 9.71265 14.6091 9.71265H16.1691C16.5891 9.72765 16.9191 10.0651 16.9191 10.4776Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 9H10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LocalExpenseIcon;
