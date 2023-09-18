import { remove, render, replace } from '../framework/render';
import ContainerForPointsView from '../view/container-points-view';
import NoPointView from '../view/no-point-view';
import PointSort from '../view/point-sort-view';
import PointPresenter from './point-presenter';
import { SortType, UpdateType, UserAction } from '../const';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort';

export default class BoardPresenter {
  // создали список ul в который элементами списка будем добавлять li (контент);
  #containerForPoints = new ContainerForPointsView();
  #noPointComponent = new NoPointView();
  #pointSort = null;

  #pointContainer = null;
  #pointsModel = null;
  #listOffers = null;
  #listDestination = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  // передали в конструктор аргумент для того, что бы можно
  // было в мейне добавить елумент (куда будет отрисовываться), для того что бы класс
  // мог что то в себя принимать необходим конструктор
  // Для того что бы что то ДОБАВЛЯТЬ в наши классы первым делом надо
  // добавлять это в конструктор, в конструктор мы добавляем что то абстрактное,
  // а что то конкретное уже передается аргументом в main.js
  constructor({ pointContainer, pointsModel }) {
    this.#pointContainer = pointContainer;
    // в main мы передали вторым аргументом точки маршрута и тут мы их обрабатываем.
    // или от противного: тут мы даем возможность presenter обработать наши точки маршрута
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointsByDay);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
    }

    return this.#pointsModel.point;
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
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    // если нет точек, то вставляем заглушку
    if (!this.#pointsModel.points.length) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointSort();
    // первым аргументом добавляем список ul, вторым место куда это будет отрисовываться
    render(this.#containerForPoints, this.#pointContainer);
    // метод getElement/element возвращает нам компонент (разметку)
    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      this.#renderPoint(this.#pointsModel.points[i]);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updatePoint) => {
    console.log(actionType, updateType, updatePoint);
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // updatePoint - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
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
        // - обновить - что????
        // this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить одну точку???
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderNoPoints() {
    render(this.#noPointComponent, this.#pointContainer);
  }

  #renderPointSort() {
    const prevSortComponent = this.#pointSort;

    this.#pointSort = new PointSort({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: this.#currentSortType,
    });

    if (prevSortComponent) {
      replace(this.#pointSort, prevSortComponent);
      remove(prevSortComponent);
    }

    render(this.#pointSort, this.#pointContainer);
  }
}
