import FilmsModel from '../model/film-model.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessStatus = {
  FROM: 200,
  TO: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({ url: 'movies' })
      .then(Api.getJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({ url: `comments/${filmId}` })
      .then(Api.getJSON);
  }

  updateData(film) {
    const adaptedData = FilmsModel.adaptToServer(film);
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedData),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(Api.getJSON)
      .then(FilmsModel.adaptToClient);
  }

  addComment(film, comment) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(Api.getJSON)
      .then((result) => {
        return {
          film: FilmsModel.adaptToClient(result.movie),
          comments: result.comments,
        };
      });
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  sync(films) {
    return this._load({
      url: 'movies/sync',
      method: Method.POST,
      body: JSON.stringify(films),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(Api.getJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (response.status < SuccessStatus.FROM || response.status > SuccessStatus.TO) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static getJSON(response) {
    return response.json();
  }
}
