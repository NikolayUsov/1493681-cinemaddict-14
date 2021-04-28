import {FilterView} from '../view/filter-view.js';
import { FILTER ,filtersFunctionMap } from '../utils/filter-utils.js';
import { remove, renderElement, RenderPosition, replace } from '../utils/render.js';

export default class FilterPresenter {
  constructor(container,filmsModel, filterModel){
    this._filterContainer = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filterComponent = null;
    this._handlerFilterClick = this._handlerFilterClick.bind(this);
    this._handlerFromModel = this._handlerFromModel.bind(this);
    this._filterModel.addToObserve(this._handlerFromModel);
    this._filmsModel.addToObserve(this._handlerFromModel);
  }

  init(){
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(this._getFilters(), this._filterModel.getFilter());
    this._filterComponent.setFilterClick(this._handlerFilterClick);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace (this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handlerFromModel () {
    this.init();
  }

  _handlerFilterClick(updateType, filterType) {
    this._filterModel.setFilter(updateType, filterType);
  }

  _getFilters () {
    const films =  this._filmsModel.getData();

    return [
      {
        type: FILTER.ALL_MOVIES,
        filterName: 'all',
        count: filtersFunctionMap[FILTER.ALL_MOVIES](films).length,
      },
      {
        type: FILTER.FAVORITES,
        filterName: 'favorites',
        count: filtersFunctionMap[FILTER.FAVORITES](films).length,
      },
      {
        type: FILTER.WATCHLIST,
        filterName: 'watchlist',
        count: filtersFunctionMap[FILTER.WATCHLIST](films).length,
      },
      {
        type: FILTER.HISTORY,
        filterName: 'history',
        count: filtersFunctionMap[FILTER.HISTORY](films).length,
      },
    ];
  }
}

