import AbstractView from './abstract.js';

const footerStatisticTemplate = (data) => {
  return `<p>${data === undefined ? 0 : data.length} movies inside</p>`;
};

export default class Footer extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return footerStatisticTemplate(this._data);
  }
}
