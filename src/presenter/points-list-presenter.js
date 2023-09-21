import { remove, render, RenderPosition } from '../framework/render';
import { filter } from '../utils/filter';
import { SortType, UpdateType, UserAction, FilterType } from '../const';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort';
import ContainerForPointsView from '../view/container-points-view';
import NoPointView from '../view/no-point-view';
import PointSort from '../view/sort-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';

export default class BoardPresenter {
  // создали список ul в который элементами списка будем добавлять li (контент);
  #containerForPoints = new ContainerForPointsView();
  #noPointComponent = null;
  #pointSort = null;
  #filterModel = null;

  #pointContainer = null;
  #pointsModel = null;
  #listOffers = null;
  #listDestination = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;

  constructor({ pointContainer, pointsModel, filterModel, onNewTaskDestroy }) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#containerForPoints.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTaskDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        // console.log([...this.#pointsModel.points].sort(sortPointsByDay));
        return filteredPoints.sort(sortPointsByDay);
      case SortType.TIME:
        // console.log([...this.#pointsModel.points].sort(sortPointsByTime));
        return filteredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        // console.log([...this.#pointsModel.points].sort(sortPointsByPrice));
        return filteredPoints.sort(sortPointsByPrice);
    }

    return filteredPoints;
  }


  init() {
    this.#listOffers = [...this.#pointsModel.listOffers];
    this.#listDestination = [...this.#pointsModel.listDestination];
    this.#renderPointsList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      containerForPoints: this.#containerForPoints.element,
      listOffers: this.#listOffers,
      listDestination: this.#listDestination,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
    // console.log(this.points);
    // console.log(this.#pointsModel);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.destinations, this.offers);
  }

  #renderPointsList() {
    // если нет точек, то вставляем заглушку
    if (!this.#pointsModel.points.length) {
      this.#renderNoPoints();
    } else {
      // первым аргументом добавляем список ul, вторым место куда это будет отрисовываться
      this.#renderPointSort();
      render(this.#containerForPoints, this.#pointContainer);
      for (let i = 0; i < this.#pointsModel.points.length; i++) {
        this.#renderPoint(this.#pointsModel.points[i]);
      }
    }
  }

  #clearPointList(resetSortType = false) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#pointSort);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updatePoint) => {
    console.log(actionType, updateType, updatePoint);
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // updatePoint - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        console.log(this.#pointsModel);
        this.#pointsModel.updatePoint(updateType, updatePoint);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, updatePoint);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, updatePoint);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList();
        this.#renderPointsList({ resetSortType: true });
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    // нужно перерисовать
    this.#clearPointList();
    this.#renderPointsList();
  };

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
