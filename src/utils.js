import dayjs from 'dayjs';
import { TimeForDate } from './const';

function getTimeInterval(dateStart, dateEnd) {
  const difTime = dayjs(dateEnd).diff(dayjs(dateStart), 'm');
  if (difTime < TimeForDate.MIN_IN_HOUR) {
    return `${difTime}M`;
  }
  if (difTime >= TimeForDate.MIN_IN_HOUR && difTime < TimeForDate.MIN_IN_MONTH) {
    return `${Math.floor(difTime / TimeForDate.MIN_IN_HOUR)}H ${(difTime % TimeForDate.MIN_IN_HOUR).toFixed(0)}M`;
  }
  if (difTime >= TimeForDate.MIN_IN_MONTH) {
    return `${Math.round(difTime / TimeForDate.MIN_IN_MONTH)}D ${dayjs(difTime % TimeForDate.MIN_IN_MONTH / TimeForDate.MIN_IN_HOUR).format('HH')}H ${dayjs(difTime % TimeForDate.MIN_IN_HOUR).format('mm')}M`;
  }
  return difTime;
}

function filterHoursPoints(date) {
  return date ? dayjs(date).format('HH:mm') : '';
}

function filterDayMonth(date) {
  return date ? dayjs(date).format('DD MMM') : '';
}

function filterPointDay(date) {
  return date ? dayjs(date).format('DD-MM-YYYY') : '';
}

function filterDateForNewPoint(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

export { getTimeInterval, filterHoursPoints, filterDayMonth, filterPointDay, filterDateForNewPoint };
