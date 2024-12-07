console.log(new Date().toISOString());
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentHour = new Date().toLocaleString("en-US", {
  timeZone: timezone,
  hour: "numeric",
  hour12: false,
});

console.log(currentHour);
console.log(timezone);

