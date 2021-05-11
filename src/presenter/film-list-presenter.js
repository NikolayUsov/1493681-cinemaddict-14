import FilmCardContainer from '../view/film-card-container';
import { remove, renderElement, RenderPosition, replace } from '../utils/render.js';
import EmptyFilmCard from '../view/empty-film-card';
import FilmCardPresenter from './film-card-presenter.js';
import StatsView from '../view/stats.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import SortView from '../view/sort.js';
import { SortType, UpdateType, UserAction, PopUpStatus } from '../utils/const.js';
import { comparerRating, compareDate, compareComments } from '../utils/compares.js';
import { FILTER, filtersFunctionMap, FilterTypeMatchToFilmsControl } from '../utils/filter-utils.js';
import  LoadingView from '../view/loading.js';

const CARD_STEP = 5;
const MAX_EXTRA_CARD = 2;

export default class FilmCardList {
  constructor(container, filterPresenter, filmModel, filterModel, api, userProfile) {
    this._api = api;
    this._filmCardListContainer = container;
    this._userProfile = userProfile;
    this._noFilmCard = new EmptyFilmCard();
    this._filterPresenter = filterPresenter;
    this._filterModel = filterModel;
    this._buttonShowMore = null;
    this._sortComponent = null;
    this._filmCardListWrapper = new FilmCardContainer();
    this._loadingComponent = new LoadingView();
    this._statsComponent = null;
    this._filmsModel = filmModel;
    this._mainContainer = this._filmCardListWrapper.getMainContainer();
    this._topCommentedContainer = this._filmCardListWrapper.getTopCommentedContainer();
    this._topRatingContainer = this._filmCardListWrapper.getTopRatingContainer();
    this._handlerChangePopUp = this._handlerChangePopUp.bind(this);
    this._handlerSortClick = this._handlerSortClick.bind(this);
    this._handleButtonShowMore = this._handleButtonShowMore.bind(this);
    this._handleChangeFromModel = this._handleChangeFromModel.bind(this);
    this._handleChangeOnView = this._handleChangeOnView.bind(this);
    this._renderExtraCards = this._renderExtraCards.bind(this);
    this._renderedCard = CARD_STEP;

    this._mainFilmCardPresenters = {};
    this._topratingFilmCardPresenter = {};
    this._topCommentedFilmCardPresenter = {};
    this._sortType = SortType.DEFAULT;

    this._filmsModel.addToObserve(this._handleChangeFromModel);
    this._filterModel.addToObserve(this._handleChangeFromModel);
  }

  init() {
    this._filterPresenter.init();
    this._renderLoading();
  }


  _getData() {
    const filterType = this._filterModel.get();
    const filteredData = filtersFunctionMap[filterType](this._filmsModel.getData());

    switch (this._sortType) {
      case SortType.RATING:
        return filteredData.sort(comparerRating);
      case SortType.DATE:
        return filteredData.sort(compareDate);
      case SortType.DEFAULT:
        return filteredData;
    }
  }

  _handleChangeFromModel(updateType, updateFilmCard) {
    if (updateFilmCard === FILTER.STATS) {
      updateType = FILTER.STATS;
    }

    switch (updateType) {
      case FILTER.STATS:
        this._clearMainFilmCards({ resetRenderedCard: true, resetSortType: true });
        this._renderStatsComponent();
        replace(this._statsComponent,this._filmCardListWrapper);
        break;
      case UpdateType.INIT:
        remove(this._loadingComponent);
        renderElement(this._filmCardListContainer, this._filmCardListWrapper, RenderPosition.BEFOREEND);
        this._renderMainFilmCards();
        this._renderExtraCards();
        break;
      case UpdateType.PATH:
        if (updateFilmCard.id in this._mainFilmCardPresenters) {
          this._mainFilmCardPresenters[updateFilmCard.id].init(updateFilmCard);
        }

        if (updateFilmCard.id in this._topratingFilmCardPresenter) {
          this._topratingFilmCardPresenter[updateFilmCard.id].init(updateFilmCard);
        }

        if (updateFilmCard.id in this._topCommentedFilmCardPresenter) {
          this._topCommentedFilmCardPresenter[updateFilmCard.id].init(updateFilmCard);
        }
        this._userProfile.updateData(this._filmsModel.getData());
        break;
      case UpdateType.MINOR:
        this._clearMainFilmCards();
        this._renderMainFilmCards();
        this._renderExtraCards();
        break;
      case UpdateType.MAJOR:
        if (this._statsComponent !== null) {
          replace(this._filmCardListWrapper,this._statsComponent);
          remove(this._statsComponent);
          this._statsComponent = null;
        }
        this._clearMainFilmCards({ resetRenderedCard: false, resetSortType: true });
        this._renderMainFilmCards();
        this._renderExtraCards();
        break;
    }
  }

  _handleChangeOnView(userAction, updateType, update, updateControl, popUpStatus) {
    const filterType = this._filterModel.get();

    if (filterType !== FILTER.ALL_MOVIES && popUpStatus === PopUpStatus.CLOSE) {
      updateType = UpdateType.MINOR;
    }

    if (FilterTypeMatchToFilmsControl[filterType] !== updateControl && this._popUpStatus === PopUpStatus.OPEN) {
      updateType = UpdateType.PATH;
    }

    switch (userAction) {
      case UserAction.UPDATE:
        this._api.updateData(update)
          .then((update) => this._filmsModel.updateData(updateType, update))
          .catch(() => {
            [
              ...Object.values(this._mainFilmCardPresenters),
              ...Object.values(this._topCommentedFilmCardPresenter),
              ...Object.values(this._topratingFilmCardPresenter),
            ]
              .forEach((elem) => elem.errorUpdate());
          });
        break;
      case UserAction.ADD_COMMENT:
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateData(updateType, update, popUpStatus);
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
    this._clearMainFilmCards({ resetRenderedCard: true });
    this._renderMainFilmCards();
  }


  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._sortType);
    this._sortComponent.setSortClick(this._handlerSortClick);
    renderElement(this._filmCardListWrapper, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderLoading() {
    renderElement(this._filmCardListContainer,  this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(filmInfo, renderContainer) {
    this._filmCardPresenter = new FilmCardPresenter(renderContainer, this._handleChangeOnView, this._handlerChangePopUp, this._filterModel, this._renderExtraCards, this._api);
    this._filmCardPresenter.init(filmInfo);
    switch (renderContainer) {
      case (this._mainContainer):
        this._mainFilmCardPresenters[filmInfo.id] = this._filmCardPresenter;
        break;
      case (this._topCommentedContainer.querySelector('.films-list__container')):
        this._topCommentedFilmCardPresenter[filmInfo.id] = this._filmCardPresenter;
        break;
      case (this._topRatingContainer.querySelector('.films-list__container')):
        this._topratingFilmCardPresenter[filmInfo.id] = this._filmCardPresenter;
    }

  }

  _renderFilmCards(films) {
    films.forEach((filmInfo) => this._renderFilmCard(filmInfo, this._mainContainer));
  }

  _renderMainFilmCards() {
    const films = this._getData();
    const filmsCount = films.length;
    if (!filmsCount) {
      this._mainContainer.innerHTML = '';
      renderElement(this._mainContainer, this._noFilmCard, RenderPosition.BEFOREEND);
      return;
    }
    this._renderSort();
    this._userProfile.updateData(this._filmsModel.getData());
    this._renderFilmCards(films.slice(0, Math.min(filmsCount, this._renderedCard)));

    if (filmsCount > this._renderedCard) {
      this._renderButtonShowMore();
    }
  }

  _clearMainFilmCards({ resetRenderedCard = false, resetSortType = false } = {}) {
    this._clearMainFilmsPresenters();
    remove(this._sortComponent);
    remove(this._buttonShowMore);
    remove(this._noFilmCard);

    if (resetRenderedCard) {
      this._renderedCard = CARD_STEP;
    } else {
      this._renderedCard = Math.min(this._getData().length, CARD_STEP);
    }

    if (resetSortType) {
      this._sortType = SortType.DEFAULT;
    }
  }

  _clearMainFilmsPresenters() {
    Object.values(this._mainFilmCardPresenters)
      .forEach((filmCard) => {
        filmCard.destroy();
      });
    this._mainFilmCardPresenters = {};
  }

  _clearExtraFilmsPresenters() {
    [
      ...Object.values(this._topCommentedFilmCardPresenter),
      ...Object.values(this._topratingFilmCardPresenter),
    ]
      .forEach((filmCard) => {
        filmCard.destroy();
      });
    this._topratingFilmCardPresenter = {};
    this._topCommentedFilmCardPresenter = {};
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

  _renderExtraCards() {
    this._clearExtraFilmsPresenters();
    if (!this._filmsModel.getData().length) {
      this._topCommentedContainer.innerHTML = '';
      this._topRatingContainer.innerHTML = '';
      return;
    }
    const sortedByRating = this._filmsModel.getData().slice().sort(comparerRating);
    const sortedByComments = this._filmsModel.getData().slice().sort(compareComments);

    sortedByRating
      .slice(0, MAX_EXTRA_CARD)
      .forEach((filmCard) => {
        this._renderFilmCard(filmCard, this._topRatingContainer.querySelector('.films-list__container'));

      });

    sortedByComments
      .slice(0, MAX_EXTRA_CARD)
      .forEach((filmCard) => {
        this._renderFilmCard(filmCard, this._topCommentedContainer.querySelector('.films-list__container'));
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

  _renderStatsComponent () {
    this._statsComponent = new StatsView(this._filmsModel.getData());
    renderElement(this._filmCardListContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }
}
