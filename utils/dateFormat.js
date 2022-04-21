module.exports = (timestamp) => {
  // define date object
  let date = new Date(timestamp);
  // define date vars
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  // define timestamp vars
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let aop;

  // if the hour is greater than or equal to 12, set to pm else set to am
  if (hour >=12 ) {
    aop = `pm`
  } else {
    aop =`am`
  }
  // if the hour is greater than 12, divide by 2 to get the hour
  if (hour > 12 ) {
    hour = Math.floor(hour / 2);
  }
  //  if the hour is = 0, set the hour to 12
  if (hour === 0) {
    hour = 12;
  }
  // return the formated date string
  return `${month}/${day}/${year} at ${hour}:${minutes}${aop}`

};