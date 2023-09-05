import dayjs from 'dayjs';

function sortPointsByDay(pointA, pointB) {
  return dayjs(pointB.timeStart).diff(dayjs(pointA.timeStart));
}

function sortPointsByPrice(pointA, pointB) {
  const pointAPrice = pointA.basePrice;
  const pointBPrice = pointB.basePrice;

  console.log(pointBPrice - pointAPrice);
  return pointBPrice - pointAPrice;
}

function sortPointsByTime(pointA, pointB) {
  const pointADuration = dayjs(pointA.timeEnd).diff(dayjs(pointA.timeStart));
  const pointBDuration = dayjs(pointB.timeEnd).diff(dayjs(pointB.timeStart));

  console.log(pointBDuration - pointADuration);
  return pointBDuration - pointADuration;
}

export { sortPointsByDay, sortPointsByPrice, sortPointsByTime };
