
import ProfileView from './view/profile.js';

import FooterView from './view/footer-statistic.js';
import { filmCardsMap } from './mock/data.js';
//import SortView from './view/sort.js';
import { renderElement } from './utils/render.js';
import FilmCardListPresenter from './presenter/film-list-presenter.js';
import {RenderPosition} from './utils/render.js';
import FilmsModel from './model/films-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const films = Array.from(filmCardsMap.keys());
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

filmsModel.setData(films);
renderElement (header, new ProfileView(films), RenderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter(main,filmsModel, filterModel);
const presenter = new FilmCardListPresenter(main, filterPresenter, filmsModel, filterModel);
presenter.init();

renderElement (footerStatistic, new FooterView(films), RenderPosition.BEFOREEND);

export {filmCardsMap};
