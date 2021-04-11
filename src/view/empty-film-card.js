import { createNode } from '../util.js';

const getEmptyFilmCardTemplate = () => {
  return `<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`;
};

export default class EmptyFilmCard {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return getEmptyFilmCardTemplate();
  }

  getElement () {
    if(!this._element) {
      this._element = createNode(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
