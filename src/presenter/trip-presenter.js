import RouteTrip from '../view/route-view';
import SortingTrip from '../view/sorting-view';
import NewPoint from '../view/point-view';
import TripEventsItem from '../view/trip-events-item';
import { render } from '../framework/render';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;

  #points = [];

  #tripComponent = new RouteTrip();

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];

    render(new SortingTrip, this.#tripContainer);
    render(this.#tripComponent, this.#tripContainer);
    // render(new NewPoint(this.#points[0]), this.#tripComponent.element);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
      render(new NewPoint(this.#points[i]), this.#tripComponent.element);
    }
  }

  #handlerShowEditPoint = () => {
    console.log('123');
  };

  #renderPoint(point) {
    const pointComponent = new TripEventsItem(point);
    render(pointComponent, this.#tripComponent.element);
  }
}
