import { FilterType } from '../const';
import { isPointFuture, isPointPresent, isPointPast } from './time';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.timeStart)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.timeStart, point.timeEnd)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.timeEnd)),
};

export { filter };
