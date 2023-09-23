import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { filterDateForEditorCreator } from '../utils/time';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_DATA_TRIP = {
  type: 'flight',
  basePrice: 0,
  destination: null,
  timeStart: new Date(),
  timeEnd: null,
  additionally: null,
  offersCheck: [],
  description: '',
  photos: null,
  isFavorite: false,
};

function editingCreationPoint({ point, listOffers, listDestination, isNewPoint }) {
  const { id, basePrice, destination, offersCheck, timeStart, timeEnd, typePoint } = point;

  const startDate = filterDateForEditorCreator(timeStart);
  const endDate = filterDateForEditorCreator(timeEnd);

  const destinationPointObj = listDestination.find((item) => item.id === destination);
  const { name } = destinationPointObj;

  const typeOffersObj = listOffers.find((item) => item.type === typePoint);
  const { offers } = typeOffersObj;

  console.log(typeOffersObj);
  console.log(typePoint);

  function createPhotosPointTemplate(destinationObj) {
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationObj.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)}
        </div>
      </div>`);
  }

  function createDescriptionPointTemplate(destinationObj) {
    return (
      `<p class="event__destination-description">${destinationObj.description}</p>`);
  }

  const createListOffersForPointTemplate = offers.map(({ idOffer, title, price }) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-id="${idOffer}" id="event-offer-luggage-${idOffer}" type="checkbox" name="event-offer-luggage"
      ${offersCheck.map((idOfferCheck) => {
    if (+idOfferCheck === idOffer) {
      return 'checked';
    }
  }).join('')}>
    <label class="event__offer-label" for="event-offer-luggage-${idOffer}">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </label>
  </div>`).join('');

  function createEventTypeListItemsTemplate() {
    return listOffers.map((offer) =>
      `<div class="event__type-item">
        <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
        <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type}</label>
      </div>`
    ).join('');
  }

  function createDestinationListItemsTemplate() {
    return listDestination.map((item) =>
      `<option value="${item.name}"></option>`
    ).join('');
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
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${createDestinationListItemsTemplate()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDate}" required>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endDate}" required>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
                  ${isNewPoint ? '' : '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}

          <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createListOffersForPointTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${createDescriptionPointTemplate(destinationPointObj)}

            ${createPhotosPointTemplate(destinationPointObj)}

          </section>
        </section>
      </form>
    </li>
  `;
}

export default class EditingCreationPointView extends AbstractStatefulView {
  #point;
  #listOffers;
  #listDestination;
  #handleClick;
  #handleFormSubmit;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #isNewPoint = null;

  constructor({ point = BLANK_DATA_TRIP, listOffers, listDestination, isNewPoint, onClick, onFormSubmit, onDeleteClick }) {
    super();
    this.#point = point;
    this.#listOffers = listOffers;
    this.#listDestination = listDestination;
    this.#handleClick = onClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#isNewPoint = isNewPoint;

    this._setState(EditingCreationPointView.parsePointToState({ point }));

    this._restoreHandlers();
  }

  get template() {
    return editingCreationPoint({ state: this._state, point: this.#point, listOffers: this.#listOffers, listDestination: this.#listDestination, isNewPoint: this.#isNewPoint });
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
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
      point: {
        ...this._state.point,
        typePoint: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#listDestination
      .find((item) => item.name === evt.target.value);

    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationId
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offersCheck: checkedBoxes.map((element) => element.dataset.id)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value
      }
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
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);

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
  static parsePointToState = ({ point }) => ({ point });

  static parseStateToPoint = (state) => state.point;

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
