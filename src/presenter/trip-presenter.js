import RouteTrip from '../view/route-view';
import SortingTrip from '../view/sorting-view';
import NewPoints from '../view/new-points-view';
import TripEventsItem from '../view/trip-events-item';
import { render } from '../render';

export default class TripPresenter {
  tripComponent = new RouteTrip();

  constructor({ tripContainer, waypointModel }) {
    this.tripContainer = tripContainer;
    this.waypointModel = waypointModel;
  }

  init() {
    this.waypoints = [...this.waypointModel.getWaypoints()];

    render(new SortingTrip, this.tripContainer);
    render(this.tripComponent, this.tripContainer);
    render(new NewPoints({ waypoint: this.waypoints[0] }), this.tripComponent.getElement());
    for (let i = 1; i < this.waypoints.length; i++) {
      render(new TripEventsItem({ waypoint: this.waypoints[i] }), this.tripComponent.getElement());
    }
  }
}
