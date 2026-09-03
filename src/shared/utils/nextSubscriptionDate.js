const getNextDate = (daysOn, schedules, fromDate = new Date()) => {
  const dayMap = {
    seg: 1,
    ter: 2,
    qua: 3,
    qui: 4,
    sex: 5,
  };

  const validDays = daysOn.map((day) => dayMap[day]);

  // Configura busca de próxima data baseado no schedules do cliente
  const startDate = new Date(fromDate);

  const todayWeekday = startDate.getDay();

  // Descobre qual dia (seg, qua, sex...) corresponde a hoje
  const todayKey = Object.keys(dayMap).find((key) => dayMap[key] === todayWeekday);

  // Se hoje for um dia configurado
  if (todayKey && schedules[todayKey]) {
    const [hour, minute] = schedules[todayKey].split(':').map(Number);

    const currentMinutes = startDate.getHours() * 60 + startDate.getMinutes();

    const scheduleMinutes = hour * 60 + minute;

    // Se já passou do horário de entrega de hoje, começa a procurar a partir de amanhã
    if (currentMinutes > scheduleMinutes) {
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const weekday = date.getDay();

    if (validDays.includes(weekday)) {
      return date.toLocaleDateString('sv-SE');
    }
  }

  return null;
};

export default getNextDate;
