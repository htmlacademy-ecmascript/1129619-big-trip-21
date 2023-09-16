export default class PointsModel {
  #points;
  #listOffers;
  #listDestination;

  constructor (points, listOffers, listDestination) {
    this.#points = points;
    this.#listOffers = listOffers;
    this.#listDestination = listDestination;
  }

  get point() {
    return this.#points;
  }

  get listOffers() {
    return this.#listOffers;
  }

  get listDestination() {
    return this.#listDestination;
  }
}
