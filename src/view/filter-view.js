import {userStatistic} from '../util.js';
import { createNode } from '../util.js';

export const mainNavigationTemplate = (data) => {
  const userCounter =  userStatistic(data);
  const {
    favorits,
    watchedFilms,
    watchlists,
  } = userCounter;

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlists}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedFilms}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorits}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class Filter {
  constructor (data) {
    this._data = data;
    this._element = null;
  }

  getTemplate () {
    return mainNavigationTemplate(this._data);
  }

  getElement () {
    if (!this._elemen) {
      return createNode (mainNavigationTemplate(this._data));
    }
    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
