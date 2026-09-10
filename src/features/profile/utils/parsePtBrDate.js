const parsePtBrDate = (dateStr) => {
  const [date, time] = dateStr.split(', ');
  const [day, month, year] = date.split('/');

  return new Date(`${year}-${month}-${day}T${time}`);
};

export default parsePtBrDate;
