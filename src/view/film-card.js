import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const filmCardTemplate = (card) => {
  const MAX_DESCRIPTION_LENGTH = 140;
  const {
    id,
    title,
    rating,
    dateCreate,
    genres,
    poster,
    description,
    userInfo,
    runtimeMessage,
    comments,
  } = card;

  const {
    isWatchList,
    isFavorite,
    isWatched,
  } = userInfo;


  let newDescription;
  description.length > MAX_DESCRIPTION_LENGTH ? newDescription = `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : newDescription = description;
  return `<article class="film-card" data-id="${id}">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(dateCreate).format('YYYY')}</span>
    <span class="film-card__duration">${runtimeMessage}</span>
    <span class="film-card__genre">${genres.length > 0 ? genres[0] : ''}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${newDescription}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchList ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._clickFilmCardHandler = this._clickFilmCardHandler.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToFavoritesHandler = this._addToFavoritesHandler.bind(this);
    this._addToWatchedHandler = this._addToWatchedHandler.bind(this);
  }

  getTemplate() {
    return filmCardTemplate(this._data);
  }

  getTitle() {
    this._initElement();
    return this._element.querySelector('.film-card__title');
  }

  getPicture() {
    this._initElement();
    return this._element.querySelector('.film-card__poster');
  }

  getComment() {
    this._initElement();
    return this._element.querySelector('.film-card__comments');
  }

  getButtonAddToWatchList() {
    this._initElement();
    return this._element.querySelector('.film-card__controls-item--add-to-watchlist');
  }

  getButtonAddToFavorits() {
    this._initElement();
    return this._element.querySelector('.film-card__controls-item--favorite');
  }

  getButtonAddFilmToWatched() {
    this._initElement();
    return this._element.querySelector('.film-card__controls-item--mark-as-watched');
  }

  _clickFilmCardHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setFilmCardClick(callback) {
    this._callback.click = callback;
    this.getTitle().addEventListener('click', this._clickFilmCardHandler);
    this.getComment().addEventListener('click', this._clickFilmCardHandler);
    this.getPicture().addEventListener('click', this._clickFilmCardHandler);
  }

  _addToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.onAddToWatchListClick();
  }

  _addToFavoritesHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  }

  _addToWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchedClick();
  }

  setFilmCardWatchListClick(callback) {
    this._callback.onAddToWatchListClick = callback;
    this.getButtonAddToWatchList().addEventListener('click', this._addToWatchListHandler);
  }

  setFilmCardFavoritsClick(callback) {
    this._callback.addToFavoritesClick = callback;
    this.getButtonAddToFavorits().addEventListener('click', this._addToFavoritesHandler);
  }

  setFilmCardWatchedClick(callback) {
    this._callback.addToWatchedClick = callback;
    this.getButtonAddFilmToWatched().addEventListener('click', this._addToWatchedHandler);
  }
}
