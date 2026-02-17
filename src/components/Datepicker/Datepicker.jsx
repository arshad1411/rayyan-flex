"use client";
import CalendarIcon from "../../components/icons/CalendarIcon";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ClearIcon from "../../components/icons/ClearIcon";
import Button from "../Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

dayjs.extend(utc);

const Datepicker = ({
  type,
  FromDate,
  ToDate,
  setFromDate,
  setToDate,
  className,
}) => {
  const clean = () => {
    setFromDate(null);
    setToDate(null);
  };

  return (
    <div>
      {type === "multipledatepicker" && (
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-4 ${className}`}>
            <div className="relative w-full">
              <DateUiPicker
                onChange={(newValue) =>
                  setFromDate(dayjs(new Date(newValue)).format("YYYY-MM-DD"))
                }
                label="From Date"
                value={FromDate}
              />
            </div>
            <div className="relative w-full">
              <DateUiPicker
                onChange={(newValue) =>
                  setToDate(
                    dayjs(new Date(newValue))
                      .endOf("day")
                      .utc()
                      .format("YYYY-MM-DDTHH:mm:ss[Z]"),
                  )
                }
                label="To Date"
                value={ToDate}
              />
            </div>
          </div>

          <Button
            onClick={clean}
            icon1={<ClearIcon color="#ffffff" />}
            icon2={<ClearIcon />}
            label="Clear"
            classvalues={"!py-1.5 !px-2"}
          />
        </div>
      )}
    </div>
  );
};

export default Datepicker;

export const DateUiPicker = ({
  onChange,
  label,
  value,
  minDate = false,
  disabled = false,
  isClearable = false,
  className,
}) => {
  return (
    <DatePicker
      showIcon
      toggleCalendarOnIconClick
      isClearable={isClearable}
      selected={value}
      onChange={onChange}
      dropdownMode="select"
      dateFormat="dd-MM-yyyy"
      placeholderText={label}
      popperPlacement="auto"
      minDate={minDate}
      disabled={disabled}
      icon={
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer !p-0 !w-5 !h-5" />
      }
      className={`w-full text-sm  border border-gray-400 focus:outline-none cursor-pointer rounded-md h-9 ${className}`}
    />
  );
};
