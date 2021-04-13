import {userStatistic} from '../utils/profile-util.js';
import AbstractView from './abstract.js';

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

export default class Filter extends AbstractView{
  constructor (data) {
    super();
    this._data = data;
  }

  getTemplate () {
    return mainNavigationTemplate(this._data);
  }

}
