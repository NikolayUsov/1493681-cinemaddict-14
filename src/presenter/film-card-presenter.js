import FilmCardView from '../view/film-card';
import PopUpFilmView from '../view/popup.js';
import { renderElement } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { remove, replace } from '../utils/render.js';
import { deepClone } from '../utils/common.js';
import { RenderPosition } from '../utils/render.js';
import { PopUpStatus } from '..//utils/const.js';
import { UpdateType, UserAction } from '../utils/const';//to-do удалить ipdateItem
import { FILTER, FilterTypeMatchToFilmsControl } from '../utils/filter-utils';

const footer = document.querySelector('.footer');

const PopUpControlType = {
  FAVORITE: 'favorite',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
};

export default class FilmCardPresenter {
  constructor(container, handlerChangeData, handlerChangeView, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmCardComponent = null;
    this._popUpComponent = null;
    this._handlerChangeData = handlerChangeData;
    this._handlerChangeView = handlerChangeView;
    this._popUpStatus = PopUpStatus.CLOSE;
    this._handleOpenPopUp = this._handleOpenPopUp.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePopUpButtonClose = this._handlePopUpButtonClose.bind(this);
    this._handlerAddToWatchList = this._handlerAddToWatchList.bind(this);
    this._handlerAddToFavorits = this._handlerAddToFavorits.bind(this);
    this._handlerAddToWatched = this._handlerAddToWatched.bind(this);
    this._handlerChangePopUpControlButton = this._handlerChangePopUpControlButton.bind(this);

    this._handlerSendNewComment = this._handlerSendNewComment.bind(this);
  }

  init(filmCardData, popupStatus = PopUpStatus.CLOSE) {
    this._filmInfo = filmCardData;
    this._popUpStatus = popupStatus;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopUpComponent = this._popUpComponent;

    this._filmCardComponent = new FilmCardView(this._filmInfo);
    this._popUpComponent = new PopUpFilmView(this._filmInfo);

    this._filmCardComponent.setFilmCardWatchListClick(this._handlerAddToWatchList);
    this._filmCardComponent.setFilmCardClick(this._handleOpenPopUp);
    this._filmCardComponent.setFilmCardFavoritsClick(this._handlerAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick(this._handlerAddToWatched);
    this._popUpComponent.setClickCloseButton(this._handlePopUpButtonClose);
    this._popUpComponent.setPopUpControlChange(this._handlerChangePopUpControlButton);
    this._popUpComponent.setSendNewComment(this._handlerSendNewComment);

    if (prevFilmCardComponent === null || prevPopUpComponent === null) {
      renderElement(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._popUpStatus === PopUpStatus.CLOSE) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._popUpStatus === PopUpStatus.OPEN) {
      replace( this._popUpComponent, prevPopUpComponent);
      console.log(this._popUpPosition, 'Записали');
      this._popUpComponent.scrollTop = this._popUpPosition;
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popUpComponent);
  }

  resetFilmView() {
    if (this._popUpStatus === PopUpStatus.OPEN) {
      this._closePopUp();
      this._popUpStatus = PopUpStatus.CLOSE;
    }
  }

  _closePopUp() {
    this._popUpComponent.getElement().remove();
    this._popUpComponent.removeElement();
    this._popUpComponent.reset(this._filmInfo);
    this._popUpStatus = PopUpStatus.CLOSE;
    document.body.style.overflow = '';
  }

  _openPopUp() {
    renderElement(footer, this._popUpComponent, RenderPosition.AFTEREND);
    document.body.style.overflow = 'hidden';
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      this._closePopUp();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopUp() {
    this._handlerChangeView();
    this._openPopUp();
    this._popUpStatus = PopUpStatus.OPEN;
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopUpButtonClose() {
    this._closePopUp();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }


  _handlerChangePopUpControlButton(buttonType) {
    if (buttonType === PopUpControlType.WATCHLIST) {
      this._updateFilmCardUserInfo('isWatchList');
    }

    if (buttonType === PopUpControlType.FAVORITE) {
      this._updateFilmCardUserInfo('isFavorite');
    }

    if (buttonType === PopUpControlType.WATCHED) {
      this._updateFilmCardUserInfo('isWatched');
    }
  }

  _updateFilmCardUserInfo(updateControl) {
    const currentFilter = this._filterModel.getFilter();
    this._updateFilmCard = deepClone(this._filmInfo);
    this._updateFilmCard.userInfo[updateControl] = !this._updateFilmCard.userInfo[updateControl];
    this._popUpPosition = this._popUpComponent.scrollTop;
    console.log(this._popUpPosition, 'запомнили');
    if (FilterTypeMatchToFilmsControl[currentFilter] === updateControl && this._popUpStatus === PopUpStatus.OPEN) {
      this._closePopUp();
    }
    this._handlerChangeData(UserAction.UPDATE, UpdateType.PATH, this._updateFilmCard, updateControl, this._popUpStatus);
  }

  _handlerAddToWatchList() {
    this._updateFilmCardUserInfo('isWatchList');
  }

  _handlerAddToFavorits() {
    this._updateFilmCardUserInfo('isFavorite');
  }

  _handlerAddToWatched() {
    this._updateFilmCardUserInfo('isWatched');
  }

  _handlerSendNewComment(updateFilmCard) {
    this._handlerChangeData(updateFilmCard, this._popUpStatus);
  }

}

