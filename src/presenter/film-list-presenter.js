import FilmCardContainer from '../view/film-card-container';
import { renderElement } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import EmptyFilmCard from '../view/empty-film-card';
import FilmCardPresenter from './film-card-presenter.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import { sortByrating, sortByComments } from '../filters.js';
import SortView from '../view/sort.js';
import { SortType } from  '../utils/const.js';
import { comparerating, compareDate} from '../utils/compares.js';
import {Filter, filtersFunctionMap} from '../view/filter-view.js';

const CARD_STEP = 5;
const MAX_EXTRA_CARD = 2;
const startCard = CARD_STEP;

export default class FilmCardList {
  constructor (container) {
    this._filmCardListContainer = container;
    this._noFilmCard = new EmptyFilmCard();
    this._buttonShowMore = new ButtonShowMoreView();
    this._filmCardListWrapper = new FilmCardContainer();
    this._renderedCard = startCard;
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
    this._filmCardData = Array.from(this._filmCardsMap.keys());
    this._defaultFilmCardData = this._filmCardData.slice();
    this._filterComponent = new Filter(this._filmCardData);
    this._sortComponent = new SortView();
    this._renderFilterMenu ();
    this._renderSort();
    renderElement (this._filmCardListContainer,  this._filmCardListWrapper, 'beforeend');
    this._renderFilmCards();
    this._renderButtonShowMore();
    this._renderExtraCard();
  }

  _sortByrating(map) {
    return sortByrating(map);
  }

  _sortByComments(map) {
    return sortByComments(map);
  }


  _sortFilmCard (type) {
    switch (type) {
      case SortType.RATING :
        this._filmCardData.sort(comparerating);
        break;
      case SortType.DATE :
        this._filmCardData.sort(compareDate);
        break;
      case SortType.DEFAULT :
        this._filmCardData = this._defaultFilmCardData.slice();
        break;
    }
    this._sortMode = type;
  }

  _handlerSortClick(type) {
    this._sortFilmCard(type);
    this._renderFilmCards();
  }

  _handlerFilterClick(filterType) {
    this._filmCardData = this._defaultFilmCardData.slice();
    if (filterType === 'All') {
      this._renderFilmCards();
      return;
    }
    this._filmCardData = this._defaultFilmCardData.slice();
    const filterFunction = filtersFunctionMap[filterType];
    this._filmCardData = filterFunction(this._filmCardData);
    this._renderFilmCards();
  }

  _renderSort () {
    renderElement ( this._filmCardListContainer, this._sortComponent,'beforeend');
    this._sortComponent.setSortClick(this._handlerSortClick);
  }

  _renderFilterMenu () {
    renderElement (this._filmCardListContainer, this._filterComponent, 'beforeend');
    this._filterComponent.setFilterClick(this._handlerFilterClick);
  }

  _renderFilmCard (container, filmCardData) {
    this._filmCardPresenter = new FilmCardPresenter(container, this._handlerChangeData, this._handlerChangePopUp);
    this._filmCardPresenter.init(filmCardData);
  }

  _renderFilmCards () {
    this._clearFilmCard();

    if (this._filmCardData.length === 0) {
      const mainContainer =  this._filmCardListWrapper.getElement();
      mainContainer.innerHTML = '';
      renderElement(mainContainer, this._noFilmCard, 'beforeend');
      return;
    }


    if (this._filmCardData.length < this._renderedCard) {
      this._renderedCard = this._filmCardData.length;
    }

    for (let i = 0; i < this._renderedCard; i++) {
      this._renderFilmCard(this._mainContainer, this._filmCardData[i]);
      this._mainFilmCardPresenters[this._filmCardData[i].id] = this._filmCardPresenter;
    }
  }

  _clearFilmCard () {
    Object.values(this._mainFilmCardPresenters)
      .forEach((filmCard) => {
        filmCard.destroy();});
    this._mainFilmCardPresenters = {};
  }

  _resetFilmCardList () {
    this._clearFilmCard();
    this._renderedCard = CARD_STEP;
  }

  _handlerChangeData (updateFilmCard, popUpStatus) {
    this._filmCardData = updateItem(this._filmCardData, updateFilmCard);
    this._filterComponent.updateData(this._filmCardData);
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

  _handlerChangePopUp () {
    [
      ... Object.values(this._mainFilmCardPresenters),
      ... Object.values(this._topCommentedFilmCardPresenter),
      ... Object.values(this._topratingFilmCardPresenter),
    ]
      .forEach((filmCard) => {
        filmCard.resetFilmView();});
  }

  _handleButtonShowMore () {
    this._renderedCard += CARD_STEP;
    if (this._renderedCard >= this._filmCardData.length) {
      this._renderedCard = this._filmCardData.length;
      this._buttonShowMore.getElement().remove();
    }

    this._renderFilmCards();
  }

  _renderExtraCard () {
    if (this._filmCardData.length === 0) {
      this._topCommentedContainer.innerHTML = '';
      this._topratingContainer.innerHTML = '';
      return;
    }
    const sortedByrating = this._sortByrating(this._filmCardsMap );
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

  _renderButtonShowMore () {
    if (this._filmCardData.length < startCard) {
      return;
    }

    renderElement (this._mainContainer, this._buttonShowMore, 'afterend');
    this._buttonShowMore.setClick(this._handleButtonShowMore);
  }
}
