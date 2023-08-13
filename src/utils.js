import dayjs from 'dayjs';
import { PHOTO_SITE } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getFivePhoto() {
  const photoArr = [];
  for (let i = 0; i < 5; i++) {
    photoArr.push(PHOTO_SITE + getRandomArbitrary(1, 100));
  }
  return photoArr;
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
    return `${Math.round(difTime / 1440)}D ${dayjs(difTime % 1440 / 60).format('HH')}H ${dayjs(difTime % 60).format('mm')}M`;
  }
  return difTime;
}

function getHoursWaypoints(date) {
  return date ? dayjs(date).format('HH:mm') : '';
}

function getNormalizeDayMonth(date) {
  return date ? dayjs(date).format('DD MMM') : '';
}

function getNormalizeEventDay(date) {
  return date ? dayjs(date).format('DD-MM-YYYY') : '';
}

function getDateForNewPoint(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

export { getRandomArrayElement, getRandomArbitrary, getTimeInterval, getHoursWaypoints, getNormalizeDayMonth, getNormalizeEventDay, getFivePhoto, getDateForNewPoint };
