const getMealType = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentHour = new Date().toLocaleString("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  });

  if (currentHour >= 7 && currentHour <= 10) {
    return "breakfast";
  } else if (currentHour >= 12 && currentHour <= 16) {
    return "lunch";
  } else if (currentHour >= 18 && currentHour <= 20) {
    return "dinner";
  } else {
    return "snack";
  }
};

module.exports = getMealType;
