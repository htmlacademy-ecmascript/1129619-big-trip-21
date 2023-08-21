import RouteTrip from '../view/route-view';
import SortingTrip from '../view/sorting-view';
import EditorCreator from '../view/editor-creator-view';
import Point from '../view/point-view';
import { render } from '../framework/render';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;
  #offers = null;

  #points = [];

  #tripComponent = new RouteTrip();

  constructor({ tripContainer, pointModel, offers }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
    this.#offers = offers;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    console.log(this.#offers);

    render(new SortingTrip, this.#tripContainer);
    render(this.#tripComponent, this.#tripContainer);
    render(new EditorCreator(this.#points[0]), this.#tripComponent.element);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #handlerShowEditPoint = () => {
    console.log('123');
  };

  #renderPoint(point) {
    const pointComponent = new Point(point);
    render(pointComponent, this.#tripComponent.element);
  }
}
