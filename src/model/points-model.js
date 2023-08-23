import { getRandomPoints } from '../mock/points';
import { mockOffers } from '../mock/points';

export default class PointsModel {
  #points = getRandomPoints();
  #listOffers = mockOffers;

  get point() {
    return this.#points;
  }

  get listOffers() {
    return this.#listOffers;
  }
}

// в модели мы получаем массив обьектов с точками.
