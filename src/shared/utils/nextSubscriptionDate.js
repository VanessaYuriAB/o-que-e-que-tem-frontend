const getNextDate = (daysOn, fromDate = new Date()) => {
  const dayMap = {
    seg: 1,
    ter: 2,
    qua: 3,
    qui: 4,
    sex: 5,
  };

  const validDays = daysOn.map((day) => dayMap[day]);

  for (let i = 0; i < 7; i++) {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + i);

    const weekday = date.getDay();

    if (validDays.includes(weekday)) {
      return date.toISOString().split('T')[0];
    }
  }

  return null;
};

export default getNextDate;
