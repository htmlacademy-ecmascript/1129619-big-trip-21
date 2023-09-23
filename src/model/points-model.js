import Observable from '../framework/observable';


export default class PointsModel extends Observable {
  #points;
  #listOffers;
  #listDestination;
  #pointsApiService = null;

  constructor({points, listOffers, listDestination, pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#points = points;
    this.#listOffers = listOffers;
    this.#listDestination = listDestination;

    this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient));
    });
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

  // id: nanoid(),
  // basePrice: getRandomArrayElement(PRICE),
  // typePoint,
  // destination: getRandomArbitrary(0, 3),
  // timeStart: getRandomArrayElement(Time.START),
  // timeEnd: getRandomArrayElement(Time.END),
  // offersCheck: getCheckedOffers(typePoint),
  // isFavorite: Boolean(getRandomArbitrary(0, 1)),

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
