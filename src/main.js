import { render, RenderPosition } from './framework/render';
import InfoTrip from './view/info-trip-view';
import FiltersTrip from './view/filters-view';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/points-model';
import { getRandomPoints } from './mock/points';
import { mockOffers } from './mock/points';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersControlElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEvents = siteMainElement.querySelector('.trip-events');

const pointModel = new PointModel(getRandomPoints());
const tripPresenter = new TripPresenter({ tripContainer: tripEvents, pointModel, mockOffers });

render(new InfoTrip(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersTrip(), siteFiltersControlElement);

tripPresenter.init();


