import FilmCardContainer from '../view/film-card-container';
import { remove, renderElement, RenderPosition } from '../utils/render.js';
import EmptyFilmCard from '../view/empty-film-card';
import FilmCardPresenter from './film-card-presenter.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import { compareComments } from '../filters.js';
import SortView from '../view/sort.js';
import { SortType, UpdateType, UserAction } from '../utils/const.js';
import { comparerating, compareDate } from '../utils/compares.js';
import { Filter, filtersFunctionMap, FILTER } from '../view/filter-view.js';

const CARD_STEP = 5;
const MAX_EXTRA_CARD = 2;

export default class FilmCardList {
  constructor(container, filmModel) {
    this._filmCardListContainer = container;
    this._noFilmCard = new EmptyFilmCard();
    this._buttonShowMore = null;
    this._sortComponent = null;
    this._filmCardListWrapper = new FilmCardContainer();
    this._filmsModel = filmModel;
    this._mainContainer = this._filmCardListWrapper.getMainContainer();
    this._topCommentedContainer = this._filmCardListWrapper.getTopCommentedContainer();
    this._topratingContainer = this._filmCardListWrapper.getTopRatingContainer();
    this._handlerChangePopUp = this._handlerChangePopUp.bind(this);
    this._handlerSortClick = this._handlerSortClick.bind(this);
    this._handleButtonShowMore = this._handleButtonShowMore.bind(this);
    this._handlerFilterClick = this._handlerFilterClick.bind(this);
    this._handleChangeFromModel = this._handleChangeFromModel.bind(this);
    this._handleChangeOnView = this._handleChangeOnView.bind(this);
    this._renderedCard = CARD_STEP;

    this._mainFilmCardPresenters = {};
    this._topratingFilmCardPresenter = {};
    this._topCommentedFilmCardPresenter = {};
    this._sortType = SortType.DEFAULT;

    this._filmsModel.addToObserve(this._handleChangeFromModel);
  }

  init() {
    this._filmsInfo = this._filmsModel.getData();
    this._defaultFilmCardData = this._filmsInfo.slice();
    this._filterComponent = new Filter(this._filmsInfo);
    this._renderFilterMenu();
    renderElement(this._filmCardListContainer, this._filmCardListWrapper, RenderPosition.BEFOREEND);
    this._renderMainFilmCards();
    this._renderExtraCard();
    //this._renderMainElements();
  }


  _getData () {
    switch(this._sortType) {
      case SortType.RATING:
        return this._filmsModel.getData().slice().sort(comparerating);
      case SortType.DATE:
        return this._filmsModel.getData().slice().sort(compareDate);
      case SortType.DEFAULT:
        return this._filmsModel.getData().slice();
    }
  }


  _handleChangeFromModel (updateType, updateFilmCard, popUpStatus) {
    switch(updateType) {
      case UpdateType.PATH :
        if (updateFilmCard.id in this._mainFilmCardPresenters) {
          this._mainFilmCardPresenters[updateFilmCard.id].init(updateFilmCard, popUpStatus);
        }

        if (updateFilmCard.id in this._topratingFilmCardPresenter) {
          this._topratingFilmCardPresenter[updateFilmCard.id].init(updateFilmCard, popUpStatus);
        }

        if (updateFilmCard.id in this._topCommentedFilmCardPresenter) {
          this._topCommentedFilmCardPresenter[updateFilmCard.id].init(updateFilmCard, popUpStatus);
        }
        break;
      case UpdateType.MINOR:
        console.log('Действия при МИНОРНОМ ОБНОВЛЕНИИ');
        break;
      case UpdateType.MAJOR:
        console.log('Действия при мажорном обновлении');
        break;
    }
  }

  _handleChangeOnView (userAction, updateType, update, popUpStatus) {
    console.log(userAction, updateType, update, popUpStatus);
    switch (userAction) {
      case UserAction.UPDATE:
        this._filmsModel.updateData(updateType, update, popUpStatus);
        break;
      case UserAction.ADD_COMMENT:
        console.log('Действия при добавлени комментария');
        break;
      case UserAction.DELETE_COMMENT:
        console.log('Дейсвтие при удалении комментария');
        break;
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

  _handlerSortClick(type) {
    this._sortType = type;
    this._clearMainFilmCards({resetRenderedCard: true});
    this._renderMainFilmCards();
  }

  _handlerFilterClick(filterType) {

    const filterFunction = filterType === 'All'
      ? filtersFunctionMap[FILTER.ALL_MOVIES]
      : filtersFunctionMap[filterType];

    this._filmsInfo = this._defaultFilmCardData.slice();
    this._filmsInfo = filterFunction(this._filmsInfo);
    this._resetFilmCardList();
    this._renderMainFilmCards();
  }

  _renderSort() {
    if ( this._sortComponent !== null ){
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._sortType);
    this._sortComponent.setSortClick(this._handlerSortClick);
    renderElement(this._filmCardListWrapper , this._sortComponent,  RenderPosition.BEFOREBEGIN);
  }

  _renderFilterMenu() {
    renderElement(this._filmCardListContainer, this._filterComponent, RenderPosition.BEFOREEND);
    this._filterComponent.setFilterClick(this._handlerFilterClick);
  }

  _renderFilmCard(filmInfo) {
    this._filmCardPresenter = new FilmCardPresenter(this._mainContainer, this._handleChangeOnView, this._handlerChangePopUp);
    this._filmCardPresenter.init(filmInfo);
    this._mainFilmCardPresenters[filmInfo.id] = this._filmCardPresenter;
  }

  _renderFilmCards (films) {
    films.forEach((filmInfo) => this._renderFilmCard(filmInfo));
  }

  _renderMainFilmCards() {
    const films = this._getData();
    const filmsCount = films.length;

    if (!filmsCount) {
      this._mainContainer.innerHTML = '';
      renderElement( this._mainContainer, this._noFilmCard, RenderPosition.BEFOREEND);
      return;
    }

    this._renderSort();
    this._renderFilmCards(films.slice(0, Math.min(filmsCount, this._renderedCard)));

    if (filmsCount > this._renderedCard) {
      this._renderButtonShowMore();
    }
    /*
    if (this._getData().length < this._renderedCard) {
      this._renderedCard = this._filmsInfo.length;
    }

    this._getData()
      .slice(this._renderedCard, this._renderedCard + CARD_STEP)
      .forEach((filmInfo) => {
        this._renderFilmCard(this._mainContainer, filmInfo);
        // this._mainFilmCardPresenters[filmInfo.id] = this._filmCardPresenter;
      });
    this._renderedCard += CARD_STEP;

    if (this._renderedCard >= this._getData().length) {
      this._renderedCard = this._getData().length;
      this._buttonShowMore.getElement().remove();
    } else {
      this._renderButtonShowMore();
    } */
  }

  _clearMainFilmCards ({resetRenderedCard = false, resetSortType = false } = {}) {
    this._clearMainFilmsPresenters();
    remove(this._sortComponent);
    remove(this._buttonShowMore);

    if (resetRenderedCard) {
      this._renderedCard = CARD_STEP;
    } else {
      this._renderedCard = Math.min(this._getData().length,  CARD_STEP);
    }

    if (resetSortType) {
      resetSortType = SortType.DEFAULT;
    }
  }

  _clearMainFilmsPresenters() {
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


  _handleButtonShowMore() {
    const filmsCount = this._getData().length;
    const newRendered = Math.min(filmsCount, this._renderedCard + CARD_STEP);
    this._renderFilmCards(this._getData().slice(this._renderedCard, newRendered));
    this._renderedCard = newRendered;

    if (filmsCount <= this._renderedCard) {
      remove(this._buttonShowMore);
    }
  }

  _renderExtraCard() {
    if (!this._getData().length) {
      this._topCommentedContainer.innerHTML = '';
      this._topratingContainer.innerHTML = '';
      return;
    }
    const sortedByrating = this._filmsModel.getData().slice().sort(comparerating);
    const sortedByComments = this._filmsModel.getData().slice().sort(compareComments);

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
    if (this._buttonShowMore !== null) {
      this._buttonShowMore = null;
    }
    this._buttonShowMore = new ButtonShowMoreView();
    this._buttonShowMore.setClick(this._handleButtonShowMore);
    renderElement(this._mainContainer, this._buttonShowMore, RenderPosition.AFTEREND);
  }

/*   _renderMainElements() {
    this._renderSort();
    renderElement(this._filmCardListContainer, this._filmCardListWrapper, RenderPosition.BEFOREEND);
    this._renderMainFilmCards();
    this._renderExtraCard();
  } */
}
