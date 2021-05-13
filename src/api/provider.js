import FilmModel from '../model/films-model.js';
const isOnline = () => {
  return window.navigator.onLine;
};

const createLocalStorageStructure = (films) => {
  return films.reduce((acc, film) => {
    return Object.assign({}, acc, { [film.id]: film });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const filmsForStore = createLocalStorageStructure(films.map(FilmModel.adaptToServer));
          this._store.setItems(filmsForStore);
          return films;
        });
    }
    const films = Object.values(this._store.getItems());
    return Promise.resolve(films.map(FilmModel.adaptToClient));
  }

  updateData(film) {
    if (isOnline()) {
      return this._api.updateData(film)
        .then((updateFilm) => {
          this._store.setItem(updateFilm.id, FilmModel.adaptToServer(updateFilm));
          return updateFilm;
        });
    }
    this._store.setItem(film.id, FilmModel.adaptToServer(Object.assign({}, film)));
    return Promise.resolve(film);
  }
  getComments(filmId) {
    return this._api.getComments(filmId);
  }


  addComment (film,comment){
    return this._api.addComment(film,comment);
  }

  deleteComment(id) {
    return this._api.deleteComment(id);
  }
  sync() {
    if (isOnline()) {
      const films = Object.values(this._store.getItems());
      return this._api.sync(films)
        .then((result) => {
          const updatedFilms = result.updated;
          this._store.setItems(updatedFilms);
        });
    }
  }
}

