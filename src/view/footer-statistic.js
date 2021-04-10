import { createNode } from '../util.js';

const footerStatisticTemplate = (data) => {
  return `<p>${data.length} movies inside</p>`;
};

export default class Footer {
  constructor(data){
    this._data = data;
    this._element = null;
  }

  getTemplate (){
    return footerStatisticTemplate(this._data);
  }

  getElement () {
    if (!this._element) {
      this._element = createNode(this.getTemplate());
    }
    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
