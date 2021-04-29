import Smart from './smart-component.js';
import { SortType } from '../utils/const.js';

const sortTemplate = (sortType) => {

  return `<ul class="sort">
  <li><a href="#" class="sort__button ${sortType === SortType.DEFAULT ? 'sort__button--active': ''}" data-sort = ${SortType.DEFAULT}>Sort by default</a></li>
  <li><a href="#" class="sort__button ${sortType === SortType.DATE ? 'sort__button--active': ''}" data-sort = ${SortType.DATE}>Sort by date</a></li>
  <li><a href="#" class="sort__button ${sortType === SortType.RATING ? 'sort__button--active': ''}" data-sort = ${SortType.RATING}>Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends Smart {
  constructor(sortType) {
    super();
    this._data = sortType;
    this._clickSortHandler = this._clickSortHandler.bind(this);
    this._activeClass = 'sort__button--active';
  }

  getTemplate() {
    return sortTemplate(this._data);
  }

  _clickSortHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    //this.changeActiveStatus(evt.target);
    this._callback.sortClick(evt.target.dataset.sort);
  }

  setSortClick(callback) {
    this._callback.sortClick = callback;
    this.getElement().addEventListener('click', this._clickSortHandler);
  }
}
