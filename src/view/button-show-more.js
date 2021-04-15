
import AbstractView from './abstract.js';

const showMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ButtonShowMore extends AbstractView {
  constructor () {
    super();
    this._clickHanddler = this._clickHanddler.bind(this);
  }

  _clickHanddler (evt) {
    evt.preventDefault();
    this._calback.onClick();
  }

  setClick (calback) {
    this._calback.onClick = calback;
    this.getElement().addEventListener('click',  this._clickHanddler);
  }

  getTemplate () {
    return showMoreButtonTemplate();
  }

}
