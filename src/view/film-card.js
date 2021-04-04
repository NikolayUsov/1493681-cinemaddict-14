/* eslint-disable quotes */
export const filmListcontainerTemplate = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container film-list--main">
    </div>
  </section>

  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container"></div>
  </section>

  <section class="films-list films-list--extra">
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
    filmDuration,
    genres,
    poster,
    description,
    userInfo,
  } = card;

  const {isWatchList,
    isFavorite,
    isWatched,
  } = userInfo;

  const  minutesDuration = filmDuration.get('minutes');
  let hourDuration = filmDuration.get('hours');
  let newDescription;
  let isWatchListClass;
  let isFavoriteClass;
  let isWatchedClass;

  hourDuration === 0 ? hourDuration = '' : hourDuration = `${hourDuration}h`;
  description.length > MAX_DESCRIPTION_LENGTH ? newDescription = `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : newDescription = description;
  isWatchList ? isWatchListClass = 'film-card__controls-item--active' : isWatchListClass = '';
  isFavorite ? isFavoriteClass = 'film-card__controls-item--active' : isFavoriteClass = '';
  isWatched ? isWatchedClass = 'film-card__controls-item--active' : isWatchedClass = '';
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dateCreate.format('YYYY')}</span>
    <span class="film-card__duration">${hourDuration} ${minutesDuration}m</span>
    <span class="film-card__genre">${genres.length > 0 ? genres.randomElement(): ''}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${newDescription}</p>
  <a class="film-card__comments">5 comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchListClass}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedClass}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClass}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export const showMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};
