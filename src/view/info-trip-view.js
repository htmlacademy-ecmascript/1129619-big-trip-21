import AbstractView from '../framework/view/abstract-view.js';

function createBoardTemplate() {
  // const { offersCheck, basePrice } = data;
  // const { type, offers } = offersCheck;

  // console.log(data);

  return /*html*/ `
  <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`;
}

export default class InfoTrip extends AbstractView{
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createBoardTemplate(this.#data);
  }
}