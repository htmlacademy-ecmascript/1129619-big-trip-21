import AbstractView from '../framework/view/abstract-view.js';
import {
  filterHoursPoints,
  getTimeInterval,
  filterDayMonth,
  filterPointDay,
} from '../utils';
import { mockOffers } from '../mock/points.js';

function createBoardTemplate(data) {
  const { typePoint, destination, timeStart, timeEnd, offersCheck, basePrice } = data;
  // const { offers } = offersCheck;
  // console.log(offersCheck);

  const typeOffersObj = mockOffers.find((item) => item.type === typePoint);
  const { offers } = typeOffersObj;

  const normalizeTimeStart = filterHoursPoints(timeStart);
  const normalizeTimeEnd = filterHoursPoints(timeEnd);
  const normalizeDate = filterDayMonth(timeStart);

  return /*html*/ `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${filterPointDay(
    timeStart
  )}">${normalizeDate}</time>
      <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${typePoint}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${typePoint} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-19T18:00">${normalizeTimeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-19T19:00">${normalizeTimeEnd}</time>
        </p>
      <p class="event__duration">${getTimeInterval(timeStart, timeEnd)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offers
    .map(
      ({ title, price }) => `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`).join('')}
    </ul>
    <button class="event__favorite-btn" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class TripEventsItem extends AbstractView{
  constructor(data) {
    super();
    this.data = data;
    // this.#handleClick = onClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createBoardTemplate(this.data);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    // this.#handleClick();
  };
}
