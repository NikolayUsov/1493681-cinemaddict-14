import { createNode } from '../util.js';

const showMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ButtonShowMore {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return showMoreButtonTemplate();
  }

  getElement () {
    if (!this._element) {
      return createNode(this.getTemplate());
    }
    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
