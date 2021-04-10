/* eslint-disable quotes */
import {filmCardsMap} from '../mock/data.js';
import { createNode } from '../util.js';

export const filmCardTemplate = (card) => {
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
  } = card;

  const {isWatchList,
    isFavorite,
    isWatched,
  } = userInfo;

  const comments = filmCardsMap.get(card);
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

export default class filmCard {
  constructor (data) {
    this._data = data;
    this.element = null;
  }

  getTemplate () {
    return filmCardTemplate(this._data);
  }

  getElement () {
    if(!this._element) {
      return createNode(this.getTemplate());
    }
  }
  removeElement () {
    this._element = null;
  }
}


