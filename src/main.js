
import ProfileView from './view/profile.js';
import FilterView from './view/filter-view.js';
import filmCardView from './view/film-card';
import FooterView from './view/footer-statistic.js';
import { filmCardsMap } from './mock/data.js';

import { renderElement } from './utils/render.js';
import FilmCardListPresenter from './presenter/filmcard-container-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const filmCards = Array.from(filmCardsMap.keys());
//const sortFilmCardByRaiting = sortByRaiting(filmCardsMap);
//const sortFilmCardByComments = sortByComments(filmCardsMap);


renderElement (header, new ProfileView(filmCards), 'beforeend');
renderElement (main, new FilterView(filmCards), 'beforeend');
const presenter = new FilmCardListPresenter(main);
presenter.init(filmCardsMap);
renderElement (footerStatistic, new FooterView(filmCards), 'beforeend');

const renderExtraFilmCard = (template, data) => {
  if (data.length === 0 ) {
    return;
  }

  const MAX_EXTRA_CARD = 2;
  for (let i = 0; i < MAX_EXTRA_CARD; i++) {
    const filmCard = data[i];
    renderElement(template, new filmCardView(filmCard), 'beforeend');
  }
};


export {filmCardsMap};
