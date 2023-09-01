import { render, replace } from '../framework/render';
import EditingCreationPointView from '../view/editing-creation-point-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #containerForPoints;
  #pointComponent;
  #point;
  #listOffers;

  #pointEditComponent;


  constructor({ containerForPoints, listOffers }) {
    this.#containerForPoints = containerForPoints;
    this.#listOffers = listOffers;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      listOffers: this.#listOffers,
      onClick: this.#handlePointClick,
    });

    this.#pointEditComponent = new EditingCreationPointView({
      point: this.#point,
      listOffers: this.#listOffers,
      onClick: this.#handleEditClick,
      // отправка формы на сервер, заменяет форму на точку
      onFormSubmit: this.#handlePointSubmit,
    });

    render(this.#pointComponent, this.#containerForPoints);
  }

  #replaceCardPointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToCardPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToCardPoint();
    }
  };

  #handleEditClick = () => {
    this.#replaceEditFormToCardPoint();
  };

  #handlePointClick = () => {
    this.#replaceCardPointToEditForm();
  };

  #handlePointSubmit = () => {
    this.#replaceEditFormToCardPoint();
  };
}
