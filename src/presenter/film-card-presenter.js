import FilmCardView from '../view/film-card';
import PopUpFilmView from '../view/popup.js';
import { renderElement } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { remove, replace } from '../utils/render.js';
import { deepClone } from '../utils/common.js';
const footer = document.querySelector('.footer');

const PopUpStatus = {
  OPEN: 'open',
  CLOSE: 'close',
};

const PopUpControlType = {
  FAVORITE: 'favorite',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
};
export default class FilmCardPresenter {
  constructor (container, handlerChangeData, handlerChangeView) {
    this._container = container;
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
  }

  init (filmCardData, popupStatus = PopUpStatus.CLOSE) {
    this._popUpStatus = popupStatus;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopUpComponent = this._popUpComponent;
    this._filmCardComponent = new FilmCardView(filmCardData);
    this._popUpComponent = new PopUpFilmView(filmCardData);
    this._movieCardData = filmCardData;
    this._filmCardComponent.setFilmCardWatchListClick(this._handlerAddToWatchList);
    this._filmCardComponent.setFilmCardClick( this._handleOpenPopUp );
    this._filmCardComponent.setFilmCardFavoritsClick( this._handlerAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick( this._handlerAddToWatched);

    if (prevFilmCardComponent === null || prevPopUpComponent === null) {
      renderElement(this._container, this._filmCardComponent, 'beforeend');
      return;
    }

    if (this._container.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._popUpStatus === PopUpStatus.OPEN) {
      this._popUpComponent = prevPopUpComponent;
      return;
    }

    if (this._container.contains(prevPopUpComponent.getElement())) {
      replace(this._popUpComponent, prevPopUpComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopUpComponent);

  }

  destroy () {
    remove(this._filmCardComponent);
    remove(this._popUpComponent);
  }

  resetFilmView () {
    if (this._popUpStatus === PopUpStatus.OPEN) {
      this._closePopUp();
      this._popUpStatus = PopUpStatus.CLOSE;
    }
  }

  _closePopUp () {
    this._popUpComponent.getElement().remove();
    this._popUpComponent.removeElement();
  }

  _openPopUp () {
    renderElement(footer, this._popUpComponent, 'afterend');
    this._popUpComponent.setClickCloseButton( this._handlePopUpButtonClose);
    this._popUpComponent.setPopUpControlChange( this._handlerChangePopUpControlButton);
  }

  _escKeyDownHandler (evt) {
    if (isEscEvent(evt)) {
      this._closePopUp ();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopUp () {
    this._handlerChangeView();
    this._openPopUp();
    this._popUpStatus = PopUpStatus.OPEN;
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopUpButtonClose () {
    this._closePopUp();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handlerChangePopUpControlButton (buttonType) {
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

  _updateFilmCardUserInfo (updateKey) {
    this._updateFilmCard = deepClone(this._movieCardData);
    this._updateFilmCard.userInfo[updateKey] = !this._updateFilmCard.userInfo[updateKey];
    this._handlerChangeData(this._updateFilmCard, this._popUpStatus);
  }

  _handlerAddToWatchList () {
    this._updateFilmCardUserInfo('isWatchList');
  }

  _handlerAddToFavorits () {
    this._updateFilmCardUserInfo('isFavorite');
  }

  _handlerAddToWatched () {
    this._updateFilmCardUserInfo('isWatched');
  }
}

