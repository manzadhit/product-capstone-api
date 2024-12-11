const getMealType = (timeZone) => {
  const currentHour = parseInt(
    new Date().toLocaleString("en-US", {
      timeZone: timeZone,
      hour: "numeric",
      hour12: false,
    }),
    10
  );

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
