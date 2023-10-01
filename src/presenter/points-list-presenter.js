import { remove, render, RenderPosition } from '../framework/render';
import { filter } from '../utils/filter';
import { SortType, UpdateType, UserAction, FilterType } from '../const';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import ContainerPointsView from '../view/container-points-view';
import NoPointView from '../view/no-point-view';
import PointSort from '../view/sort-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PointsListPresenter {
  // создали список ul в который элементами списка будем добавлять li (контент);
  #containerForPoints = new ContainerPointsView();
  #noPointComponent = null;
  #pointSort = null;
  #filterModel = null;

  #pointContainer = null;
  #pointsModel = null;
  #loadingComponent = new LoadingView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ pointContainer, pointsModel, filterModel, onNewTaskDestroy }) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      containerForPoints: this.#containerForPoints.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get pointsFiltered() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }

    return filteredPoints;
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      containerForPoints: this.#containerForPoints.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.destinations, this.offers);

    if (this.#noPointComponent !== null) {
      remove(this.#noPointComponent);
    }
  }

  #renderPointsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.#pointsModel.points.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPointSort();
    render(this.#containerForPoints, this.#pointContainer);
    for (let i = 0; i < this.pointsFiltered.length; i++) {
      this.#renderPoint(this.pointsFiltered[i]);
    }
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  #clearPointList(resetSortType = false) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#pointSort);
    remove(this.#loadingComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  init() {
    this.#renderPointsList();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, updatePoint) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(updatePoint.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatePoint);
        } catch (err) {
          this.#pointPresenters.get(updatePoint.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatePoint);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(updatePoint.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, updatePoint);
        } catch (err) {
          this.#pointPresenters.get(updatePoint.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList();
        this.#renderPointsList({ resetSortType: true });
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#pointContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType,
    });
    render(this.#noPointComponent, this.#pointContainer);
  }

  #renderPointSort() {
    this.#pointSort = new PointSort({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#pointSort, this.#pointContainer, RenderPosition.AFTERBEGIN);
  }
}
