const getMealType = () => {
  const currentHour = new Date().getHours();

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
