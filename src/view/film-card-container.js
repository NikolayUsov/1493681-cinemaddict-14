import { createNode } from '../util.js';

const filmListcontainerTemplate = () => {
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

export default class FilmCardContainer {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return filmListcontainerTemplate();
  }

  getElement () {
    if(!this._element) {
      this._element = createNode(this.getTemplate());
    }
    return  this._element;
  }

  removeElement () {
    this._element = null;
  }
}
