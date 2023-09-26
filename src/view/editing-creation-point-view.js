import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { filterDateForEditorCreator } from '../utils/time';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_DATA_TRIP = {
  type: 'flight',
  basePrice: 0,
  destinations: '',
  timeStart: new Date(),
  timeEnd: null,
  offersCheck: [],
};

function editingCreationPoint(point, listOffers, listDestination, isNewPoint) {
  const { id, basePrice, destination, offersCheck, timeStart, timeEnd, typePoint, isSaving, isDeleting, isDisabled } = point;

  const startDate = filterDateForEditorCreator(timeStart);
  const endDate = filterDateForEditorCreator(timeEnd);

  const destinationPointObj = listDestination.find((item) => item.id === destination);

  const typeOffersObj = listOffers.find((item) => item.type === typePoint);

  function createPhotosPointTemplate() {
    if (destinationPointObj) {
      return destinationPointObj.pictures.map((picture) =>
        `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
      ).join('');
    }
  }

  function createDestinationsBlockTemplate() {
    if (destinationPointObj.description) {
      return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destinationPointObj.description}</p>
              <div class="event__photos-container">
                <div class="event__photos-tape">${createPhotosPointTemplate()}</div>
              </div>
            </section>`;
    } else {
      return '';
    }
  }

  const destinationsBlockTemplate = createDestinationsBlockTemplate();

  const createListOffersForPointTemplate = () => typeOffersObj.offers.map((offer) => {
    const isChecked = offersCheck.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-id="${offer.id}" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');

  const typeOffersTemplate = createListOffersForPointTemplate();

  function createOffersBlockTemplate() {
    if (typeOffersObj.offers.length > 0) {
      return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${typeOffersTemplate}
              </div>
            </section>`;
    } else {
      return '';
    }
  }
  const offersBlockTemplate = createOffersBlockTemplate();

  /// типы событий
  function createEventTypeListItemsTemplate() {
    return listOffers.map((offer) =>
      `<div class="event__type-item">
        <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
        <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type}</label>
      </div>`
    ).join('');
  }

  // список городов для выбора
  function createDestinationListItemsTemplate() {
    return listDestination.map((item) =>
      `<option value="${item.name}"></option>`
    ).join('');
  }

  function createResetBtnTemplate() {
    if (isNewPoint) {
      return `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>`;
    } else {
      return `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>`;
    }
  }

  return /*html*/ `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typePoint}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeListItemsTemplate()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${typePoint}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(destinationPointObj?.name || '')}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${createDestinationListItemsTemplate()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate} " required>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}" required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>

          ${createResetBtnTemplate()}
                  ${isNewPoint ? '' : '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}
        </header>
        <section class="event__details">
          ${offersBlockTemplate}
          ${destinationsBlockTemplate}

        </section>
      </form>
    </li>
  `;
}

export default class EditingCreationPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleClick = null;
  #handleFormSubmit = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #isNewPoint = null;

  constructor({ point = BLANK_DATA_TRIP, offers, destinations, isNewPoint, onClick, onFormSubmit, onDeleteClick }) {
    super();
    this._setState(EditingCreationPointView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleClick = onClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#isNewPoint = isNewPoint;

    this._restoreHandlers();

  }

  get template() {
    return editingCreationPoint(this._state, this.#offers, this.#destinations, this.#isNewPoint);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditingCreationPointView.parseStateToPoint(this._state));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      timeStart: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      timeEnd: userDate,
    });
  };


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditingCreationPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      typePoint: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations
      .find((item) => item.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({
      ...this._state.point,
      destination: selectedDestinationId
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const updatedCheckedCheckboxes = [];
    checkedBoxes.map((element) => updatedCheckedCheckboxes.push(element.dataset.id, 10));
    this._setState({
      ...this._state.point,
      offersCheck: updatedCheckedCheckboxes,
    });
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({
      basePrice: parseInt((evt.target.value), 10),
    });
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditingCreationPointView.parseStateToPoint(this._state));
  };

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name=event-start-time]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.timeStart,
        maxDate: this._state.timeEnd,
        onChange: this.#dateFromChangeHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name=event-end-time]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.timeEnd,
        minDate: this._state.timeStart,
        onChange: this.#dateToChangeHandler,
      }
    );
  }

  _restoreHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);


    if (!this.#isNewPoint) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#clickHandler);
    }

    this.element
      .querySelectorAll('.event__type-input')
      .forEach((input) => input
        .addEventListener('change', this.#typeChangeHandler));

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input
        .addEventListener('change', this.#offerChangeHandler));

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

    this.#setDatepicker();

  };

  // point не единственное свой-во нашего состояние, будут еще в дальнейшем
  // нет обращения к this, поэтому метод статичный
  static parsePointToState = (point) => ({
    ...point,
    isSaving: false,
    isDeleting: false,
    isDisabled: false,
  });

  static parseStateToPoint(state) {
    const point = {
      ...state
    };

    delete point.isSaving;
    delete point.isDeleting;
    delete point.isDisabled;

    return point;
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditingCreationPointView.parsePointToState(point)
    );
  }
}
