const zeroPrefix = (number) => `0${number}`.slice(-2);
const dateReg = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.*/;

function date2DateTimeLocalString(date) {
  if (typeof date === "string" && dateReg.test(date)) {
    date = new Date(date);
  }
  if (!(date instanceof Date)) return date;
  const pre = date.toISOString().slice(0, 11);
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${pre}${zeroPrefix(hour)}:${zeroPrefix(min)}`;
}

function date2ddmmyyyy(date) {
  if (typeof date === "string" && dateReg.test(date)) {
    date = new Date(date);
  }
  if (!(date instanceof Date)) return date;
  const [year, month, day] = date.toISOString().slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

function date2hhmmddmmyyyy(date) {
  if (typeof date === "string" && dateReg.test(date)) {
    date = new Date(date);
  }
  if (!(date instanceof Date)) return date;
  const [year, month, day] = date.toISOString().slice(0, 10).split("-");
  const hour = `0${date.getHours()}`.slice(-2);
  const min = `0${date.getMinutes()}`.slice(-2);
  return `${hour}:${min}-${day}/${month}/${year}`;
}

export { date2DateTimeLocalString, date2ddmmyyyy, date2hhmmddmmyyyy };
