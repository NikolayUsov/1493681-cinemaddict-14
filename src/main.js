
import ProfileView from './view/profile.js';

import FooterView from './view/footer-statistic.js';
import { filmCardsMap } from './mock/data.js';
//import SortView from './view/sort.js';
import { renderElement } from './utils/render.js';
import FilmCardListPresenter from './presenter/film-list-presenter.js';
import {RenderPosition} from './utils/render.js';
import FilmsModel from './model/films-model.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const films = Array.from(filmCardsMap.keys());
const filmsModel = new FilmsModel();

filmsModel.setData(films);
renderElement (header, new ProfileView(films), RenderPosition.BEFOREEND);

const presenter = new FilmCardListPresenter(main, filmsModel);
presenter.init();

renderElement (footerStatistic, new FooterView(films), RenderPosition.BEFOREEND);

export {filmCardsMap};
