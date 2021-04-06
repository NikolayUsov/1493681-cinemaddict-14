/* eslint-disable quotes */
import {filmCardsMap} from '../mock/data.js';

export const filmListcontainerTemplate = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container film-list--main">
    </div>
  </section>

  <section class="films-list films-list--extra films-list--raiting">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container"></div>
  </section>

  <section class="films-list films-list--extra films-list--top-commented">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container"></div>
  </section>
  </section>`;
};


export const filmCardTemplate = (card) => {
  const MAX_DESCRIPTION_LENGTH = 140;
  const {
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

  return `<article class="film-card">
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

export const showMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};
