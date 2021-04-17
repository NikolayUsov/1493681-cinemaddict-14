import FilmCardView from '../view/film-card';
import PopUpFilmView from '../view/popup.js';
import { renderElement } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { remove } from '../utils/render.js';

const footer = document.querySelector('.footer');

export default class FilmCardPresenter {
  constructor (container) {
    this._container = container;
    this._filmCardComponent = null;
    this._popUpComponent = null;

    this._handleOpenPopUp = this._handleOpenPopUp.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePopUpButtonClose =this._handlePopUpButtonClose.bind(this);
  }

  init (filmCardData) {
    this._filmCardComponent = new FilmCardView(filmCardData);
    this._popUpComponent = new PopUpFilmView(filmCardData);
    renderElement(this._container, this._filmCardComponent, 'beforeend');

    this._filmCardComponent.setFilmCardClick( this._handleOpenPopUp );
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

}

