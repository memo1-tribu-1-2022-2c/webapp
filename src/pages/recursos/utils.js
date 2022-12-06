// https://stackoverflow.com/questions/49277112/react-js-how-to-set-a-default-value-for-input-date-type
export function getCurrentDateInput() {
  const dateObj = new Date();

  // get the month in this format of 04, the same for months
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return shortDate;
}
