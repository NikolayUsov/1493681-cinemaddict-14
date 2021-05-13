
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
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic nikUsov';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const APP_NAME = 'Cinemadict';
const VERSION = '14';
const STORE_KEY = `${APP_NAME}-${VERSION}`;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const profileView = new ProfileView();
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_KEY, window.localStorage);
const apiWithProvider = new Provider(api, store);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW scope:', registration.scope);})
      .catch(() => {
        console.log('err sw');
      });
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
const presenter = new FilmCardListPresenter(main, filterPresenter, filmsModel, filterModel, apiWithProvider, profileView);
presenter.init();


apiWithProvider.getFilms()
  .then(succesStartApp)
  .catch(errorStartApp);


window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
