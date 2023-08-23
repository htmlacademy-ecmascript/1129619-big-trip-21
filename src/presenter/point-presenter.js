import { render } from '../framework/render';
import ContainerForPoints from '../view/container-points-view';
import EditingCreationPoint from '../view/editing-creation-point-view';
import Point from '../view/point-view';

export default class PointPresenter {
  // создали список ul в который элементами списка будем добавлять li (контент);
  #containerForPoints = new ContainerForPoints();

  #pointContainer;
  #pointsModel;
  #listPoints;
  #listOffers;

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

    // первым аргументом добавляем список ul, вторым место куда это будет отрисовываться
    render(this.#containerForPoints, this.#pointContainer);
    // метод getElement возвращает нам компонент (разметку)
    render(new EditingCreationPoint({ point: this.#listPoints[0], listOffers: this.#listOffers }), this.#containerForPoints.element);

    for (let i = 0; i < this.#listPoints.length; i++) {
      render(new Point({ point: this.#listPoints[i], listOffers: this.#listOffers }), this.#containerForPoints.element);
      // this.#renderPoint({ point: this.#listPoints[i], listOffers: this.#listOffers });
    }
  }

  // #renderPoint() {
  //   const pointComponent = new Point({ point: this.#listPoints, listOffers: this.#listOffers });
  //   render(pointComponent, this.#containerForPoints.element);
  // }
}
