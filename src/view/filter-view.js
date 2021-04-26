import Smart from './smart-component.js';

const FILTER = {
  ALL_MOVIES: 'All movies',
  WATHCLIST: 'Watchlist',
  FAVOURITES: 'Favorites',
  HISTORY: 'History',
};


export const filtersFunctionMap = {
  [FILTER.ALL_MOVIES] : (filmCards) => filmCards,
  [FILTER.WATHCLIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.userInfo.isWatchList),
  [FILTER.FAVOURITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.userInfo.isFavorite),
  [FILTER.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.userInfo.isWatched),
};


const generateFilter = (filmCards) => {
  return Object.entries(filtersFunctionMap).map(([filterName, filterFunction]) => {
    return {
      filter: filterName,
      filtredFilm: filterFunction(filmCards),
    };
  });
};

const mainNavigationTemplate = (filmCards) => {

  const filters = generateFilter(filmCards);

  const mainNavigationItem = (itemMenu, isActive) => {
    const {filter, filtredFilm} = itemMenu;

    return `<a href="#${filter === FILTER.ALL_MOVIES ? 'all' : `${filter.toLowerCase()}`}"
    class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}"
    data-filter = ${filter}
    >
    ${filter === FILTER.ALL_MOVIES ?
    FILTER.ALL_MOVIES :
    `${filter} <span class="main-navigation__item-count">${filtredFilm.length}</span>`}
    </a>`;
  };

  const  createMainNavigationTemplate = () => {
    return filters.map((filterMenu, index) => mainNavigationItem(filterMenu, index === 0)).join('');
  };

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    ${createMainNavigationTemplate()}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export class Filter extends Smart{
  constructor (data) {
    super();
    this._data = data;
    this._handlerFilterClick = this._handlerFilterClick.bind(this);
  }

  getTemplate () {
    return mainNavigationTemplate(this._data);
  }

  updateData (update) {
    this._data = update;
    this.updateElement();
  }

  restoreHandlers () {
    this.setFilterClick(this._callback.filterClick);
  }

  _handlerFilterClick(evt) {
    if(evt.target.tagName !== 'A') {
      return;
    }

    this._callback.filterClick(evt.target.dataset.filter);
  }

  setFilterClick (callback) {
    this._callback.filterClick = callback;
    this.getElement().addEventListener('click', this._handlerFilterClick);
  }
}
