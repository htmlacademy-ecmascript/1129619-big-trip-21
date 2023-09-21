import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  detFilter (updateType, receivedFilter) {
    this.#filter = receivedFilter;

    this._notify(updateType, receivedFilter);
  }
}
