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

// const Time = {
//   START:['2022-08-06T00:05:00.845Z', '2022-08-07T01:10:20.845Z', '2022-08-08T03:19:43.845Z', '2022-08-09T04:16:32.845Z', '2022-08-06T05:28:12.845Z',],
//   END: ['2022-08-11T10:30:20.845Z', '2022-08-12T11:13:21.845Z', '2022-08-13T12:00:02.845Z', '2022-08-14T13:42:32.845Z', '2022-08-15T14:53:52.845Z',],
// };

// console.log(isPointPast('2022-08-12T11:13:21.845Z'))

export { getTimeInterval, filterHoursPoints, filterDayMonth, filterPointDay, filterDateForEditorCreator, isPointFuture, isPointPresent, isPointPast };
