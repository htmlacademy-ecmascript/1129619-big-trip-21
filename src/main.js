import { render, RenderPosition } from './framework/render';
import TripInfo from './view/trip-info-view';
import TripFilters from './view/trip-filters-view';
// import PointSort from './view/point-sort-view';
import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import { getRandomPoints, getListOffers, getDestinations } from './mock/points';
import { generateFilter } from './mock/filter';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

// мы создали модель обьект с ключом points и значением массива обьектов с точками
const pointsModel = new PointsModel(getRandomPoints(), getListOffers(), getDestinations());

// аргументом мы передаем кусок разметки,
// где у нас будет распологаться содержимое презентера
const boardPresenter = new BoardPresenter({ pointContainer: tripEventsElement, pointsModel });

const filters = generateFilter(pointsModel.point);

render(new TripInfo(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new TripFilters({ filters }), siteTripFiltersElement);
// render(new PointSort(), tripEventsElement);

boardPresenter.init();
