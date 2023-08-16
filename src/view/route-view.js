import AbstractView from '../framework/view/abstract-view.js';

function createBoardTemplate() {

  return /*html*/ `
  <ul class="trip-events__list">
  </ul>`;
}

export default class RouteTrip extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
