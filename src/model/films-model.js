import Observer from '..//utils/observe.js';
import { deepClone } from '../utils/common.js';
import dayjs from 'dayjs';
export default class FilmModel extends Observer {
  constructor () {
    super();
    this._films = [];
  }

  setData (films, typeUpdate) {
    this._films = films.slice();
    this._notify(typeUpdate);
  }

  getData () {
    return this._films;
  }

  updateData (typeUpdate, update, popUpStatus) {
    const index = this._films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t find update element');
    }
    this._films =[
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];
    this._notify(typeUpdate, update, popUpStatus);
  }

  static adaptToClient (film) {
    let adaptedFilm = deepClone(film);
    adaptedFilm = Object.assign(
      {},
      adaptedFilm,
      {
        poster: film.film_info.poster,
        title:  film.film_info.title,
        originalTitle: film.film_info.alternative_title,
        description: film.film_info.description,
        director: film.film_info.director,
        screenWriters: film.film_info.writers,
        actors: film.film_info.actors,
        rating: film.film_info.total_rating,
        dateCreate: film.film_info.release.date,
        country: film.film_info.release.release_country,
        runtime: film.film_info.runtime,
        get runtimeMessage () {
          const hour = Math.trunc(this.runtime/60);
          const minutes = this.runtime % 60;
          return `${hour > 0 ? `${hour}h` : ''} ${minutes > 0 ? `${minutes}m` : ''}`;
        },
        genres: film.film_info.genre,
        adult:  film.film_info.age_rating,
        userInfo: {
          isWatchList: film.user_details.watchlist,
          isFavorite: film.user_details.favorite,
          isWatched: film.user_details.already_watched,
          watchedDate: film.user_details.watching_date,
        },
      },
    );

    delete adaptedFilm.user_details;
    delete adaptedFilm.film_info;
    return adaptedFilm;
  }

  static adaptToServer (film) {
    const isDataNull = film.userInfo.watchedDate === null;
    let adaptedFilm = deepClone(film);

    adaptedFilm = Object.assign(
      {},
      adaptedFilm,
      {
        film_info: {
          poster: film.poster,
          title: film.title,
          alternative_title: film.originalTitle,
          description: film.description,
          director: film.director,
          writers: film.screenWriters,
          actors: film.actors,
          total_rating: film.rating,
          release: {
            date:  dayjs(film.dateCreate).toISOString(),
            release_country: film.country,
          },
          runtime: film.runtime,
          genre: film.genres,
          age_rating: film.adult,
        },
        user_details: {
          watchlist: film.userInfo.isWatchList,
          favorite: film.userInfo.isFavorite,
          already_watched:film.userInfo.isWatched,
          watching_date: isDataNull ? dayjs() : dayjs(film.userInfo.watchedDate).toISOString(),
        },
      },
    );
    delete adaptedFilm.poster;
    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.screenWriters;
    delete adaptedFilm.country;
    delete adaptedFilm.genres;
    delete adaptedFilm.adult;
    delete adaptedFilm.actors;
    delete adaptedFilm.rating;
    delete adaptedFilm.dateCreate;
    delete adaptedFilm.runtime;
    delete adaptedFilm.userInfo;
    delete adaptedFilm.runtimeMessage;
    return adaptedFilm;
  }
}
