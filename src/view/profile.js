import {userStatistic} from '../util.js';

export const headerProfileTemplate = (data) => {
  const userInfo = userStatistic(data);
  const { userStatus } = userInfo;
  return `<section class="header__profile profile">
  <p class="profile__rating">${userStatus}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};
