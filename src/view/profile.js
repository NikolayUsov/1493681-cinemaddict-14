import {userStatistic} from '../util.js';
import { createNode } from '../util.js';

const headerProfileTemplate = (data) => {
  const userInfo = userStatistic(data);
  const { userStatus } = userInfo;
  return `<section class="header__profile profile">
  <p class="profile__rating">${userStatus}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};


export default class Profile {
  constructor (data) {
    this._data = data;
    this._element = null;
  }

  getTemplate () {
    return headerProfileTemplate(this._data);
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
