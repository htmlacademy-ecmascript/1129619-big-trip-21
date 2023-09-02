import AbstractView from '../framework/view/abstract-view';
import {
  getTimeInterval,
  filterHoursPoints,
  filterDayMonth,
  filterPointDay,
} from '../utils/time';

function createPoint(point, listOffers) {
  const { basePrice, destination, isFavorite, offersCheck, timeStart, timeEnd, typePoint } = point;

  const day = filterDayMonth(timeStart);
  const hoursStart = filterHoursPoints(timeStart);
  const hoursEnd = filterHoursPoints(timeStart);
  const timeInterval = getTimeInterval(timeStart, timeEnd);
  const startPointDay = filterPointDay(timeStart);

  const typeOffersObj = listOffers.find((offer) => offer.type === typePoint);
  const { offers } = typeOffersObj;

  const createTypeOffersTemplate = () => offers.map(({ idOffer, title, price }) => offersCheck.map((checkedOfferId) => {
    if (checkedOfferId === idOffer) {
      return `<li class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </li>`;
    }
  }).join('')).join('');


  const favoriteClassPoint = isFavorite ? 'event__favorite-btn--active' : '';

  return /*html*/ `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startPointDay}">${day}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typePoint}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typePoint} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${timeStart}">${hoursStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${timeEnd}">${hoursEnd}</time>
          </p>
          <p class="event__duration">${timeInterval}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">


        ${ createTypeOffersTemplate(offers) }

        </ul>
        <button class="event__favorite-btn ${favoriteClassPoint}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class PointView extends AbstractView {
  #point = null;
  #listOffers = null;
  #handleClick = null;
  #handleFavoriteClick = null;

  constructor({ point, listOffers, onClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#listOffers = listOffers;
    this.#handleClick = onClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event__favorite-icon').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPoint(this.#point, this.#listOffers);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
