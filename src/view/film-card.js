
import AbstractView from './abstract.js';
//import { getComments } from '../utils/film-card-map.js';
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

  const {isWatchList,
    isFavorite,
    isWatched,
  } = userInfo;


  let newDescription;
  description.length > MAX_DESCRIPTION_LENGTH ? newDescription = `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : newDescription = description;

  return `<article class="film-card" data-id="${id}">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dateCreate.format('YYYY')}</span>
    <span class="film-card__duration">${runtimeMessage}</span>
    <span class="film-card__genre">${genres.length > 0 ? genres.randomElement(): ''}</span>
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

export default class filmCard extends AbstractView {
  constructor (data) {
    super();
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
    this._handlerAddToWatchList = this._handlerAddToWatchList.bind(this);
    this._handlerAddToFavorites = this._handlerAddToFavorites.bind(this);
    this._handlerAddToWatched = this._handlerAddToWatched.bind(this);
  }

  getTemplate () {
    return filmCardTemplate(this._data);
  }

  getTitle () {
    this._initElement();
    return this._element.querySelector('.film-card__title');
  }

  getPicture () {
    this._initElement();
    return this._element.querySelector('.film-card__poster');
  }

  getComment () {
    this._initElement();
    return this._element.querySelector('.film-card__comments');
  }

  getButtonAddToWatchList () {
    this._initElement();
    return this._element.querySelector('.film-card__controls-item--add-to-watchlist');
  }

  getButtonAddToFavorits () {
    this._initElement();
    return this._element.querySelector('.film-card__controls-item--favorite');
  }

  getButtonAddFilmToWatched () {
    this._initElement();
    return this._element.querySelector('.film-card__controls-item--mark-as-watched');
  }

  _clickHandler (evt) {
    evt.preventDefault();
    this._calback.click();
  }

  setFilmCardClick (calback) {
    this._calback.click = calback;
    this.getTitle().addEventListener('click', this._clickHandler);
    this.getComment().addEventListener('click', this._clickHandler);
    this.getPicture().addEventListener('click', this._clickHandler);
  }

  _handlerAddToWatchList (evt) {
    evt.preventDefault();
    this._calback.onAddToWatchListClick();
  }

  _handlerAddToFavorites (evt) {
    evt.preventDefault();
    this._calback.addToFavoritesClick();
  }

  _handlerAddToWatched (evt) {
    evt.preventDefault();
    this._calback.addToWatchedClicl();
  }
  setFilmCardWatchListClick (calback) {
    this._calback.onAddToWatchListClick = calback;
    this.getButtonAddToWatchList().addEventListener('click', this._handlerAddToWatchList);
  }

  setFilmCardFavoritsClick (calback) {
    this._calback.addToFavoritesClick = calback;
    this.getButtonAddToFavorits().addEventListener('click', this._handlerAddToFavorites);
  }

  setFilmCardWatchedClick (calback) {
    this._calback.addToWatchedClicl = calback;
    this.getButtonAddFilmToWatched().addEventListener('click', this._handlerAddToWatched);
  }
}
