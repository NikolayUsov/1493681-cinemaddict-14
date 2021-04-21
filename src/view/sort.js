import AbstractView from './abstract.js';
import { SortType } from  '../utils/const.js';

const sortTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort = ${SortType.DEFAULT}>Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort = ${SortType.DATE}>Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort = ${SortType.RATING}>Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor () {
    super();
    this._handlerClickSort = this._handlerClickSort.bind(this);
    this._changeActiveButton = this._changeActiveButton.bind(this);
  }

  getTemplate () {
    return sortTemplate();
  }

  _changeActiveButton (target) {
    const links = this.getElement().querySelectorAll('.sort__button');
    for(const link of links) {
      link.classList.remove('sort__button--active');
    }
    target.classList.add('sort__button--active');
  }

  _handlerClickSort (evt) {
    if (evt.target.tagName !== 'A'){
      return;
    }

    evt.preventDefault();
    this._changeActiveButton(evt.target);
    this._calback.sortClick(evt.target.dataset.sort);
  }

  setSortClick (calback) {
    this._calback.sortClick = calback;
    this.getElement().addEventListener('click', this._handlerClickSort);
  }
}
