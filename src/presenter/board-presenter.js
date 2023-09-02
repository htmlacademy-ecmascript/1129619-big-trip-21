import { render } from '../framework/render';
import ContainerForPointsView from '../view/container-points-view';
import NoPointView from '../view/no-point-view';
import PointSort from '../view/point-sort-view';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common';

export default class BoardPresenter {
  // создали список ul в который элементами списка будем добавлять li (контент);
  #containerForPoints = new ContainerForPointsView();
  #noPointComponent = new NoPointView();
  #pointSort = new PointSort();

  #points = [];

  #pointContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #listOffers = null;

  #pointPresenters = new Map();

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
    // создаем новое свойство listPoints и в него сохраняем все, что нам вернет
    // getPoint() с помощью спред оператора.
    //
    // сделано это для упращения на момент обучения, что бы все находилось в одном месте,
    // в презентере, далее это будет перенесено в модель.
    //
    //по факту это нарушение правил MVP
    this.#listPoints = [...this.#pointsModel.point];
    //та же логика, но для списка оферов. Мы из модели получили данные и обработали их в презентере
    this.#listOffers = [...this.#pointsModel.listOffers];

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
    if(!this.#listPoints.length) {
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
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #renderNoPoints() {
    render(this.#noPointComponent, this.#pointContainer);
  }

  #renderPointSort() {
    render(this.#pointSort, this.#pointContainer);
  }
}
