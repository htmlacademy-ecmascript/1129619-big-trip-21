import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.timeStart,
      'date_to': point.timeEnd,
      'is_favorite': point.isFavorite,
      'offers': point.offersCheck,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.timeStart;
    delete adaptedPoint.timeEnd;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.offersCheck;

    return adaptedPoint;

  }
}
