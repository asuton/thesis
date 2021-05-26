export const getCurrentDate = () => {
  const dateTime = new Date();
  const year = dateTime.getFullYear();
  let month = (dateTime.getMonth() + 1).toString();
  if (Number(month) < 10) {
    month = "0" + (dateTime.getMonth() + 1).toString();
  }
  let day = dateTime.getDate().toString();
  if (Number(day) < 10) {
    day = "0" + day;
  }
  const date = year + "-" + month + "-" + day;
  let hour = dateTime.getHours().toString();
  if (Number(hour) < 10) {
    hour = "0" + hour;
  }
  let minute = dateTime.getMinutes().toString();
  if (Number(minute) < 10) {
    minute = "0" + minute;
  }
  const time = hour + ":" + minute;
  return { date, time };
};
