import AbstractView from '../framework/view/abstract-view';

function createFilterItemTemplate(filter, isChecked) {
  const {type, isAvailability} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${isChecked ? '' : 'checked'}
      ${isAvailability ? '' : 'disabled'}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createTripFiltersTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
          ${filterItemsTemplate}
          <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
}

export default class TripFiltersView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters);
  }
}
