import FilmCardView from '../view/film-card';
import PopUpFilmView from '../view/popup.js';
import { renderElement } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { remove } from '../utils/render.js';
import { deepClone } from '../utils/common.js';
const footer = document.querySelector('.footer');

export default class FilmCardPresenter {
  constructor (container, handlerChangeData) {
    this._container = container;
    this._filmCardComponent = null;
    this._popUpComponent = null;
    this._handlerChangeData = handlerChangeData;

    this._handleOpenPopUp = this._handleOpenPopUp.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePopUpButtonClose = this._handlePopUpButtonClose.bind(this);
    this._handlerAddToWatchList = this._handlerAddToWatchList.bind(this);
    this._handlerAddToFavorits = this._handlerAddToFavorits.bind(this);
    this._handlerAddToWatched = this._handlerAddToWatched.bind(this);
  }

  init (filmCardData) {
    this._filmCardComponent = new FilmCardView(filmCardData);
    this._popUpComponent = new PopUpFilmView(filmCardData);
    renderElement(this._container, this._filmCardComponent, 'beforeend');

    this._movieCardData = filmCardData;
    this._filmCardComponent.setFilmCardWatchListClick(this._handlerAddToWatchList);
    this._filmCardComponent.setFilmCardClick( this._handleOpenPopUp );
    this._filmCardComponent.setFilmCardFavoritsClick( this._handlerAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick( this._handlerAddToWatched);
  }

  destroy () {
    remove(this._filmCardComponent);
    remove(this._popUpComponent);
  }

  _closePopUp () {
    this._popUpComponent.getElement().remove();
    this._popUpComponent.removeElement();
  }

  _openPopUp () {
    renderElement(footer, this._popUpComponent, 'afterend');
    this._popUpComponent.setClickCloseButton( this._handlePopUpButtonClose);
  }

  _escKeyDownHandler (evt) {
    if (isEscEvent(evt)) {
      this._closePopUp ();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopUp () {
    this._openPopUp();
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopUpButtonClose () {
    this._closePopUp();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _updateFilmCardUserInfo (updateKey) {
    this._updateFilmCard = deepClone(this._movieCardData);
    this._updateFilmCard.userInfo[updateKey] = !this._updateFilmCard.userInfo[updateKey];
    this._handlerChangeData(this._updateFilmCard);
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

