import { FilterType } from '../const';
import { isPointFuture, isPointPresent, isPointPast } from './time';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateStart)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateStart, point.dateEnd)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateEnd)),
};

export { filter };
