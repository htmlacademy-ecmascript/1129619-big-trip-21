import Observable from '../framework/observable';
import { UpdateType } from '../const';


export default class PointsModel extends Observable {
  #points = [];
  #listOffers;
  #listDestination;
  #pointsApiService = null;

  constructor({ listOffers, listDestination, pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#listOffers = listOffers;
    this.#listDestination = listDestination;
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      timeStart: point['date_from'],
      timeEnd: point['date_to'],
      isFavorite: point['is_favorite'],
      offersCheck: point['offers'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['offers'];

    return adaptedPoint;

  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      console.log(this.#points);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  get listOffers() {
    return this.#listOffers;
  }

  get listDestination() {
    return this.#listDestination;
  }

  updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updatedPoint,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, updatedPoint) {
    this.#points = [
      updatedPoint,
      ...this.#points,
    ];

    this._notify(updateType, updatedPoint);
  }


  deletePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((task) => task.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
