import { getRandompoint } from '../mock/points';

const POINTS_COUNT = 4;

export default class PointModel {
  points = Array.from({ length: POINTS_COUNT }, getRandompoint);

  getPoints() {
    return this.points;
  }
}
