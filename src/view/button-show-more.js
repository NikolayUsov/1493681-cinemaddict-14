
import AbstractView from './abstract.js';

const showMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ButtonShowMore extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.onClick();
  }

  setClick(callback) {
    this._callback.onClick = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  getTemplate() {
    return showMoreButtonTemplate();
  }

}
