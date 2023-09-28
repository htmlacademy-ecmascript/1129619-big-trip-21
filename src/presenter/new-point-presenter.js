import {remove, render, RenderPosition} from '../framework/render.js';
import EditingCreationPointView from '../view/editing-creation-point-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #containerForPoints = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  #destinations = [];
  #offers = [];

  constructor({containerForPoints, onDataChange, onDestroy}) {
    this.#containerForPoints = containerForPoints;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    this.#destinations = destinations;
    this.#offers = offers;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditingCreationPointView({
      destinations: this.#destinations,
      offers: this.#offers,
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

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
