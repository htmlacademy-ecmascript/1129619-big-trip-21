import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class PointsModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      typePoint: point['type'],
      basePrice: point['base_price'],
      timeStart: point['date_from'],
      timeEnd: point['date_to'],
      isFavorite: Boolean(point['is_favorite']),
      offersCheck: point['offers'],
    };

    delete adaptedPoint['type'];
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

      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async updatePoint(updateType, updated) {
    const index = this.#points.findIndex((point) => point.id === updated.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(updated);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, updated) {
    try {
      const response = await this.#pointsApiService.addPoint(updated);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add task');
    }
  }

  async deletePoint(updateType, updated) {
    const index = this.#points.findIndex((task) => task.id === updated.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(updated);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }
}
