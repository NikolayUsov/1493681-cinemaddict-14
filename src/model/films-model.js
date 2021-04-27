import Observer from '..//utils/observe.js';

export default class FilmModel extends Observer {
  constructor () {
    super();
    this._films = [];
  }

  setData (films) {
    this._films = films.slice();
  }

  getData () {
    return this._films;
  }

  updateData (typeUpdate, update, popUpStatus) {
    const index = this.getData().findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t find update element');
    }
    [
      ...this.getData().slice(0, index),
      update,
      ...this.getData().slice(index + 1),
    ];

    this._notify(typeUpdate, update, popUpStatus);
  }
}

