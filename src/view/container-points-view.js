import AbstractView from '../framework/view/abstract-view';

function createContainerForPoints() {
  return /*html*/ `
    <ul class="trip-events__list"></ul>
  `;
}

export default class ContainerForPointsView extends AbstractView {
  get template() {
    return createContainerForPoints();
  }
}
