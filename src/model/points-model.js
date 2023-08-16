import { getRandomPoint } from '../mock/points';

const WAYPOINTS_COUNT = 4;

export default class PointModel {
  #points = Array.from({ length: WAYPOINTS_COUNT }, getRandomPoint);

  constructor(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}
