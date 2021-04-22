import AbstractView from './abstract.js';

const filmListcontainerTemplate = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container film-list--main">
    </div>
  </section>

  <section class="films-list films-list--extra films-list--raiting">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container"></div>
  </section>

  <section class="films-list films-list--extra films-list--top-commented">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container"></div>
  </section>
  </section>`;
};

export default class FilmCardContainer extends AbstractView {

  getTemplate () {
    return filmListcontainerTemplate();
  }

  getMainContainer () {
    return this.getElement().querySelector('.film-list--main');
  }

  getTopRatingContainer () {
    return this.getElement().querySelector('.films-list--raiting');
  }

  getTopCommentedContainer () {
    return this.getElement().querySelector('.films-list--top-commented');
  }
}
