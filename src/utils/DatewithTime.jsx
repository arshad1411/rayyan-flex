import dayjs from "dayjs";

export const setCurrentTime = (date) => {
  const now = dayjs();
  const dateWithTime = dayjs(date)
    .set("hour", now.hour())
    .set("minute", now.minute())
    .set("second", now.second());

  return dateWithTime.toISOString();
};
