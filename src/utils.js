import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getTimeInterval(dateStart, dateEnd) {
  const difTime = dayjs(dateEnd).diff(dayjs(dateStart), 'm');
  if (difTime < 60) {
    return `${difTime}M`;
  }
  if (difTime >= 60 && difTime < 1440) {
    return `${Math.floor(difTime / 60)}H ${(difTime % 60).toFixed(0)}M`;
  }
  if (difTime >= 1440) {
    return `${Math.round(difTime / 1440)}D ${difTime % 1440 / 60}H ${dayjs(difTime % 60).format('mm')}M`;
  }
  return difTime;
}

function getHoursWaypoints(date) {
  return date ? dayjs(date).format('HH mm') : '';
}

function getNormalizeDayMonth(date) {
  return date ? dayjs(date).format('DD MMM') : '';
}

function getNormalizeEventDay(date) {
  return date ? dayjs(date).format('DD-MM-YYYY') : '';
}

export { getRandomArrayElement, getRandomArbitrary, getTimeInterval, getHoursWaypoints, getNormalizeDayMonth, getNormalizeEventDay };
