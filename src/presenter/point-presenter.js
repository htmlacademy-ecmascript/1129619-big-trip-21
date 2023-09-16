import { render, replace, remove } from '../framework/render';
import EditingCreationPointView from '../view/editing-creation-point-view';
import PointView from '../view/point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #containerForPoints = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #listOffers = null;
  #mode = Mode.DEFAULT;

  #listDestination = [];


  constructor({ containerForPoints, listOffers, listDestination, onDataChange, onModeChange }) {
    this.#containerForPoints = containerForPoints;
    this.#listOffers = listOffers;
    this.#listDestination = listDestination;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      listOffers: this.#listOffers,
      listDestination: this.#listDestination,
      onClick: this.#handlePointClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditingCreationPointView({
      point: this.#point,
      listOffers: this.#listOffers,
      listDestination: this.#listDestination,
      onClick: this.#handleEditClick,
      // отправка формы на сервер, заменяет форму на точку
      onFormSubmit: this.#handlePointSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#containerForPoints);
      return;
    }

    //проводим проверку для того, чтобы не пытаться
    // заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToCardPoint();
    }
  }

  #replaceCardPointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToCardPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToCardPoint();
    }
  };

  #handleEditClick = () => {
    this.#replaceEditFormToCardPoint();
  };

  #handlePointClick = () => {
    this.#replaceCardPointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handlePointSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToCardPoint();
  };
}
