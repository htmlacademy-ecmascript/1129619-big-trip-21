import InfoTrip from './view/info-trip-view';
import FiltersTrip from './view/filters-view';
import TripPresenter from './presenter/trip-presenter';
import WaypointModel from './model/waypoints-model';
import { getTimeInterval, getHoursWaypoints } from './utils';
import { render, RenderPosition } from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersControlElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEvents = siteMainElement.querySelector('.trip-events');

const waypointModel = new WaypointModel();
const tripPresenter = new TripPresenter({ tripContainer: tripEvents, waypointModel });

render(new InfoTrip(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersTrip(), siteFiltersControlElement);

tripPresenter.init();

// let one = '2024-04-03 14:00';
// let two = '2024-04-04 14:30';

// getTimeInterval(one, two);
// getHoursWaypoints(one);
// getHoursWaypoints(two);

// one = '2024-04-03 14:00';
// two = '2024-04-03 15:30';
// getTimeInterval(one, two);

// one = '2024-04-03 14:00';
// two = '2024-04-04 14:30';
// getTimeInterval(one, two);

// one = '2024-04-03 14:00';
// two = '2024-05-04 14:30';
// getTimeInterval(one, two);

