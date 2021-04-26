import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor () {
    super();
  }

  updateData (update, isUpdateNow = true) {
    if (!update) {
      return;
    }

    this._data =  Object.assign(
      {},
      this._data,
      update,
    );

    if(!isUpdateNow) {
      return;
    }
    this.updateElement();
  }

  updateElement () {
    const prevElement =  this.getElement();
    const parent = prevElement.parentElement;
    this._scroll = this.getElement().scrollTop;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.getElement().scrollTop = this._scroll;
    this.restoreHandlers();
  }

  changeActiveStatus (target) {
    const activeLinks = this.getElement().querySelector(`.${this._activeClass}`);
    activeLinks.classList.remove(this._activeClass);
    target.classList.add(this._activeClass);
  }

  restoreHandlers () {
    throw new Error(`Abstract method not implemented: ${this.restoreListeners.name}`);
  }
}
