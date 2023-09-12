import { remove, render, replace } from '../framework/render';
import ContainerForPointsView from '../view/container-points-view';
import NoPointView from '../view/no-point-view';
import PointSort from '../view/point-sort-view';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common';
import { SortType } from '../const';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort';

export default class BoardPresenter {
  // создали список ul в который элементами списка будем добавлять li (контент);
  #containerForPoints = new ContainerForPointsView();
  #noPointComponent = new NoPointView();
  #pointSort = null;

  #points = [];

  #pointContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listOffers = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

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
  }

  init() {
    this.#listPoints = [...this.#pointsModel.point];
    this.#listOffers = [...this.#pointsModel.listOffers];
    this.#sourcedPoints = [...this.#pointsModel.point];
    this.#renderPointsList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      containerForPoints: this.#containerForPoints.element,
      listOffers: this.#listOffers,
      onDataChange: this.#handlePointChange,
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
    if (!this.#listPoints.length) {
      this.#renderNoPoints();
      return;
    }
    this.#renderPointSort();
    // первым аргументом добавляем список ul, вторым место куда это будет отрисовываться
    render(this.#containerForPoints, this.#pointContainer);
    // метод getElement/element возвращает нам компонент (разметку)
    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#listPoints.sort(sortPointsByDay);
        break;
      case SortType.TIME:
        this.#listPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#listPoints.sort(sortPointsByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;

    // this.#renderPointSort();

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
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

    if(prevSortComponent) {
      replace(this.#pointSort, prevSortComponent);
      remove(prevSortComponent);
    }

    render(this.#pointSort, this.#pointContainer);
  }
}
