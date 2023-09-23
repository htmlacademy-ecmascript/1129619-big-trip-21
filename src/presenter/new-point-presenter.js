import {remove, render, RenderPosition} from '../framework/render.js';
import EditingCreationPointView from '../view/editing-creation-point-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #containerForPoints = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  #listDestination = [];
  #listOffers = [];

  constructor({containerForPoints, onDataChange, onDestroy}) {
    this.#containerForPoints = containerForPoints;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(listDestination, listOffers) {
    this.#listDestination = listDestination;
    this.#listOffers = listOffers;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditingCreationPointView({
      listDestination: this.#listDestination,
      listOffers: this.#listOffers,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#pointEditComponent, this.#containerForPoints, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if(this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
