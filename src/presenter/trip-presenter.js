import RouteTrip from '../view/route-view';
import SortingTrip from '../view/sorting-view';
import NewPoint from '../view/point-view';
import TripEventsItem from '../view/trip-events-item';
import { render } from '../render';

export default class TripPresenter {
  tripComponent = new RouteTrip();

  constructor({ tripContainer, pointModel }) {
    this.tripContainer = tripContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];

    render(new SortingTrip, this.tripContainer);
    render(this.tripComponent, this.tripContainer);
    render(new NewPoint({ point: this.points[0] }), this.tripComponent.getElement());
    for (let i = 1; i < this.points.length; i++) {
      render(new TripEventsItem({ point: this.points[i] }), this.tripComponent.getElement());
    }
  }
}
