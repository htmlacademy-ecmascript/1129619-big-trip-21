import dayjs from 'dayjs';

function getTimeInterval(dateStart, dateEnd) {
  const start = dayjs(dateStart);
  const end = dayjs(dateEnd);
  const differentTime = end.diff(start);
  const days = Math.floor(differentTime / (1000 * 60 * 60 * 24) % 30);
  const hours = Math.floor((differentTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((differentTime / (1000 * 60)) % 60);

  if (!days && !hours) {
    return `${minutes}M`;
  }
  if (!days) {
    return `${hours}H ${minutes}M`;
  }
  return `${days}D ${hours}H ${minutes}M`;
}

function filterHoursPoints(date) {
  return date ? dayjs(date).format('HH:mm') : '';
}

function filterDayMonth(date) {
  return date ? dayjs(date).format('MMM DD') : '';
}

function filterPointDay(date) {
  return date ? dayjs(date).format('YYYY-MM-DD') : '';
}

function filterDateForEditorCreator(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

function isPointFuture(dateStart) {
  return dayjs().isBefore(dayjs(dateStart));
}

function isPointPresent(dateStart, dateEnd) {
  return dayjs().isAfter(dayjs(dateStart)) && dayjs().isBefore(dayjs(dateEnd));
}

function isPointPast(dateEnd) {
  return dayjs().isAfter(dayjs(dateEnd));
}

export { getTimeInterval, filterHoursPoints, filterDayMonth, filterPointDay, filterDateForEditorCreator, isPointFuture, isPointPresent, isPointPast };
