import FilmCardContainer from '../view/film-card-container';
import { renderElement, RenderPosition } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import EmptyFilmCard from '../view/empty-film-card';
import FilmCardPresenter from './film-card-presenter.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import { sortByRating, sortByComments } from '../filters.js';
import SortView from '../view/sort.js';
import { SortType } from '../utils/const.js';
import { comparerating, compareDate } from '../utils/compares.js';
import { Filter, filtersFunctionMap, FILTER } from '../view/filter-view.js';

const CARD_STEP = 5;
const MAX_EXTRA_CARD = 2;

export default class FilmCardList {
  constructor(container) {
    this._filmCardListContainer = container;
    this._noFilmCard = new EmptyFilmCard();
    this._buttonShowMore = new ButtonShowMoreView();
    this._filmCardListWrapper = new FilmCardContainer();
    this._renderedCard = 0;
    this._mainContainer = this._filmCardListWrapper.getMainContainer();
    this._topCommentedContainer = this._filmCardListWrapper.getTopCommentedContainer();
    this._topratingContainer = this._filmCardListWrapper.getTopRatingContainer();
    this._handlerChangeData = this._handlerChangeData.bind(this);
    this._handlerChangePopUp = this._handlerChangePopUp.bind(this);
    this._handlerSortClick = this._handlerSortClick.bind(this);
    this._handleButtonShowMore = this._handleButtonShowMore.bind(this);
    this._handlerFilterClick = this._handlerFilterClick.bind(this);
    this._mainFilmCardPresenters = {};
    this._topratingFilmCardPresenter = {};
    this._topCommentedFilmCardPresenter = {};
    this._sortMode = SortType.DEFAULT;
  }

  init(filmCardsMap) {
    this._filmCardsMap = new Map([...filmCardsMap]);
    this._filmsInfo = Array.from(this._filmCardsMap.keys());
    this._defaultFilmCardData = this._filmsInfo.slice();
    this._filterComponent = new Filter(this._filmsInfo);
    this._sortComponent = new SortView();
    this._renderFilterMenu();
    this._renderSort();
    renderElement(this._filmCardListContainer, this._filmCardListWrapper, RenderPosition.BEFOREEND);
    this._renderFilmCards();

    this._renderExtraCard();
  }

  _sortByRating(map) {
    return sortByRating(map);
  }

  _sortByComments(map) {
    return sortByComments(map);
  }


  _sortFilmCard(type) {
    switch (type) {
      case SortType.RATING:
        this._filmsInfo.sort(comparerating);
        break;
      case SortType.DATE:
        this._filmsInfo.sort(compareDate);
        break;
      case SortType.DEFAULT:
        this._filmsInfo = this._defaultFilmCardData.slice();
        break;
    }
    this._sortMode = type;
  }

  _handlerSortClick(type) {
    this._sortFilmCard(type);
    this._resetFilmCardList();
    this._renderFilmCards();
  }

  _handlerFilterClick(filterType) {

    const filterFunction = filterType === 'All'
      ? filtersFunctionMap[FILTER.ALL_MOVIES]
      : filtersFunctionMap[filterType];

    this._filmsInfo = this._defaultFilmCardData.slice();
    this._filmsInfo = filterFunction(this._filmsInfo);
    this._resetFilmCardList();
    this._renderFilmCards();
  }

  _renderSort() {
    renderElement(this._filmCardListContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortClick(this._handlerSortClick);
  }

  _renderFilterMenu() {
    renderElement(this._filmCardListContainer, this._filterComponent, RenderPosition.BEFOREEND);
    this._filterComponent.setFilterClick(this._handlerFilterClick);
  }

  _renderFilmCard(container, filmCardData) {
    this._filmCardPresenter = new FilmCardPresenter(container, this._handlerChangeData, this._handlerChangePopUp);
    this._filmCardPresenter.init(filmCardData);
  }

  _renderFilmCards() {

    this._buttonShowMore.getElement().remove();
    if (!this._filmsInfo.length) {
      const mainContainer = this._filmCardListWrapper.getElement();
      mainContainer.innerHTML = '';
      renderElement(mainContainer, this._noFilmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsInfo.length < this._renderedCard) {
      this._renderedCard = this._filmsInfo.length;
    }

    this._filmsInfo
      .slice(this._renderedCard, this._renderedCard + CARD_STEP)
      .forEach((filmInfo)  =>{
        this._renderFilmCard(this._mainContainer, filmInfo);
        this._mainFilmCardPresenters[filmInfo.id] = this._filmCardPresenter;
      });
    this._renderedCard += CARD_STEP;

    if (this._renderedCard >= this._filmsInfo.length) {
      this._renderedCard = this._filmsInfo.length;
      this._buttonShowMore.getElement().remove();
    } else {
      this._renderButtonShowMore();
    }
  }

  _clearFilmCard() {
    Object.values(this._mainFilmCardPresenters)
      .forEach((filmCard) => {
        filmCard.destroy();
      });
    this._mainFilmCardPresenters = {};
  }

  _resetFilmCardList() {
    this._clearFilmCard();
    this._renderedCard = 0;
  }

  _handlerChangeData(updateFilmCard, popUpStatus) {
    this._filmsInfo = updateItem(this._filmsInfo, updateFilmCard);
    this._filterComponent.updateData(this._filmsInfo);
    if (updateFilmCard.id in this._mainFilmCardPresenters) {
      this._mainFilmCardPresenters[updateFilmCard.id].init(updateFilmCard, popUpStatus);
    }

    if (updateFilmCard.id in this._topratingFilmCardPresenter) {
      this._topratingFilmCardPresenter[updateFilmCard.id].init(updateFilmCard, popUpStatus);
    }

    if (updateFilmCard.id in this._topCommentedFilmCardPresenter) {
      this._topCommentedFilmCardPresenter[updateFilmCard.id].init(updateFilmCard, popUpStatus);
    }
  }

  _handlerChangePopUp() {
    [
      ...Object.values(this._mainFilmCardPresenters),
      ...Object.values(this._topCommentedFilmCardPresenter),
      ...Object.values(this._topratingFilmCardPresenter),
    ]
      .forEach((filmCard) => {
        filmCard.resetFilmView();
      });
  }

  _handleButtonShowMore() {

    this._renderFilmCards();
  }

  _renderExtraCard() {
    if (this._filmsInfo.length === 0) {
      this._topCommentedContainer.innerHTML = '';
      this._topratingContainer.innerHTML = '';
      return;
    }
    const sortedByrating = this._sortByRating(this._filmCardsMap);
    const sortedByComments = this._sortByComments(this._filmCardsMap);

    sortedByrating
      .slice(0, MAX_EXTRA_CARD)
      .forEach((filmCard) => {
        this._renderFilmCard(this._topratingContainer.querySelector('.films-list__container'), filmCard);
        this._topratingFilmCardPresenter[filmCard.id] = this._filmCardPresenter;
      });

    sortedByComments
      .slice(0, MAX_EXTRA_CARD)
      .forEach((filmCard) => {
        this._renderFilmCard(this._topCommentedContainer.querySelector('.films-list__container'), filmCard);
        this._topCommentedFilmCardPresenter[filmCard.id] = this._filmCardPresenter;
      });
  }

  _renderButtonShowMore() {
    renderElement(this._mainContainer, this._buttonShowMore, RenderPosition.AFTEREND);
    this._buttonShowMore.setClick(this._handleButtonShowMore);
  }
}
