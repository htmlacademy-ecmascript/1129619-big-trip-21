
import RouteTrip from '../view/route-view';
import SortingTrip from '../view/sorting-view';
import NewPoints from '../view/new-points-view';
import EditPoint from '../view/edit-point-view';
import TripEventsItem from '../view/trip-events-item';
import { render } from '../render';

export default class TripPresenter {
  tripComponent = new RouteTrip();

  constructor({ tripContainer }) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortingTrip, this.tripContainer);
    render(this.tripComponent, this.tripContainer);
    render(new EditPoint(), this.tripComponent.getElement());
    render(new NewPoints(), this.tripComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new TripEventsItem(), this.tripComponent.getElement());
    }
  }
}
