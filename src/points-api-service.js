import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'}) // получаем данные с сервера
      .then(ApiService.parseResponse); // преобразуем в json
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

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'type': point.typePoint,
      'base_price': point.basePrice,
      'date_from': point.timeStart,
      'date_to': point.timeEnd,
      'is_favorite': point.isFavorite,
      'offers': point.offersCheck,
    };

    delete adaptedPoint.typePoint;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.timeStart;
    delete adaptedPoint.timeEnd;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.offersCheck;

    return adaptedPoint;

  }
}
