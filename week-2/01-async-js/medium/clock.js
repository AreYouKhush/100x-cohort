const d = new Date();
let hours = 15;
let minutes = d.getMinutes();
let seconds = d.getSeconds();
let meridiem;
let adjustedHours;
function add0(num) {
  return (num < 10 ? "0" : "") + num;
}

setInterval(() => {
  seconds++;
  if (seconds == 60) {
    seconds = 60 - seconds;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 60 - minutes;
    hours++;
  }
  if (hours > 12) {
    adjustedHours = hours - 12;
    meridiem = "PM";
  } else {
    adjustedHours = hours;
    meridiem = "AM";
  }
  if (hours == 24) {
    hours = 0;
  }
  console.log(
    add0(adjustedHours),
    ":",
    add0(minutes),
    ":",
    add0(seconds),
    meridiem
  );
}, 1000);
