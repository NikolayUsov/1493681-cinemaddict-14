
import ProfileView from './view/profile.js';
import FooterView from './view/footer-statistic.js';
import { UpdateType } from './utils/const.js';
import { renderElement } from './utils/render.js';
import FilmCardListPresenter from './presenter/film-list-presenter.js';
import {RenderPosition} from './utils/render.js';
import FilmsModel from './model/films-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import Api from './api/api.js';

const AUTHORIZATION = 'Basic nikUsov';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const profileView = new ProfileView();
const api = new Api(END_POINT, AUTHORIZATION);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('success sw');
        console.log("SW scope:", registration.scope);})
      .catch(() => {console.log('err sw');});
  });
}

const succesStartApp = (films) => {
  profileView.setData(films);
  filmsModel.setData(films, UpdateType.INIT);
  renderElement (header, profileView, RenderPosition.BEFOREEND);
  renderElement (footerStatistic, new FooterView(films), RenderPosition.BEFOREEND);
};

const errorStartApp = () => {
  filmsModel.setData([], UpdateType.INIT);
  renderElement (footerStatistic, new FooterView(), RenderPosition.BEFOREEND);
};


const filterPresenter = new FilterPresenter(main,filmsModel, filterModel);
const presenter = new FilmCardListPresenter(main, filterPresenter, filmsModel, filterModel, api, profileView);
presenter.init();


api.getFilms()
  .then(succesStartApp)
  .catch(errorStartApp);

