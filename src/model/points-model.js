export default class PointsModel {
  #points;
  #listOffers;

  constructor (points, listOffers) {
    this.#points = points;
    this.#listOffers = listOffers;
  }

  get point() {
    return this.#points;
  }

  get listOffers() {
    return this.#listOffers;
  }
}
