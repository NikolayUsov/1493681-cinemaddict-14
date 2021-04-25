
import ProfileView from './view/profile.js';

import FooterView from './view/footer-statistic.js';
import { filmCardsMap } from './mock/data.js';
//import SortView from './view/sort.js';
import { renderElement } from './utils/render.js';
import FilmCardListPresenter from './presenter/film-list-presenter.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const filmCards = Array.from(filmCardsMap.keys());


renderElement (header, new ProfileView(filmCards), 'beforeend');

const presenter = new FilmCardListPresenter(main);
presenter.init(filmCardsMap);
renderElement (footerStatistic, new FooterView(filmCards), 'beforeend');

export {filmCardsMap};
