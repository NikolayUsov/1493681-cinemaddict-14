import { createNode } from '../utils/abstract-utils.js';

export default class Abstract {
  constructor () {
    if (new.target === Abstract) {
      throw new Error ('Can\'t instantiate abstract class!');
    }
    this._element = null;
    this._calback = {};
  }

  _initElement () {
    if (!this._element) {
      this._element = createNode(this.getTemplate());
    }
  }
  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }

  getElement () {
    this._initElement();
    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
