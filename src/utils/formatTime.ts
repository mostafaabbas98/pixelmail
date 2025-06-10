import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatTime = (dateString: string) => {
  const date = dayjs(dateString);
  const now = dayjs();
  const diffInHours = now.diff(date, "hour");

  let displayTime: string;

  if (diffInHours < 24) {
    displayTime = date.format("h:mm A");
  } else if (diffInHours < 168) {
    displayTime = date.format("ddd");
  } else if (diffInHours < 8760) {
    displayTime = date.format("MMM D");
  } else {
    displayTime = date.format("MMM D, YYYY");
  }

  return {
    display: displayTime,
    tooltip: date.format("dddd, MMMM D, YYYY [at] h:mm A"),
  };
};
