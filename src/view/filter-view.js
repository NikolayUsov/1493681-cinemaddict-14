import Smart from './smart-component.js';
import { FILTER } from '../utils/filter-utils.js';
import { UpdateType } from '../utils/const.js';

const mainNavigationTemplate = (filters, activeFilter) => {
  const genereFilterItem = (filter) => {

    const {type, filterName, count} = filter;
    return `<a href="#${filterName}"
    data-filter = "${type}"
    class="main-navigation__item ${activeFilter === type ? 'main-navigation__item--active' : ''}">
    ${type} ${type === FILTER.ALL_MOVIES ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
  };

  const generateFiltersTemplate =() => {
    return filters.map((filter) => genereFilterItem(filter)).join('');
  };

  return `<nav class="main-navigation">
   <div class="main-navigation__items">
    ${generateFiltersTemplate()}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export class FilterView extends Smart {
  constructor(filters, currentFilter) {
    super();
    this._data =filters;
    this._currentFilter = currentFilter;
    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate() {
    return mainNavigationTemplate(this._data, this._currentFilter);
  }

  updateData(update) {
    this._data = update;
    this.updateElement();
  }

  restoreHandlers() {
    this.setFilterClick(this._callback.filterClick);
  }

  _filterClickHandler(evt) {
    if (!evt.target.classList.contains('main-navigation__item')) {
      return;
    }

    this._callback.filterClick(UpdateType.MAJOR, evt.target.dataset.filter);
  }

  setFilterClick(callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._filterClickHandler);
  }
}
