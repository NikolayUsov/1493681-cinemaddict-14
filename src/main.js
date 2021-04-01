import './view/test-module.js';
import { headerProfileTemplate } from './view/profile.js';
import { mainNavigationTemplate } from './view/navigation.js';
import { mainFilterTemplate } from './view/filter.js';
import { filmListcontainerTemplate, filmCardTemplate, showMoreButtonTemplate } from './view/film-list-container.js';
import { footerStatisticTemplate } from './view/footer-statistic.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');

const MAX_MAIN_FILM_CARD = 5;
const MAX_EXTRA_FILM_CARD = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmCard = (container, card, items, place = 'beforeend') => {
  for (let i = 1; i <= items; i++) {
    render(container,card, place);
  }
};

render (header, headerProfileTemplate(), 'beforeend');
render (main, mainNavigationTemplate(), 'beforeend');
render (main, mainFilterTemplate(), 'beforeend');
render (main, filmListcontainerTemplate(), 'beforeend');

// Задать вопрос в ПП про данное решение
const filmCardContainers = document.querySelectorAll('.films-list__container');
// Задать вопрос о целесообразности использовать индексы
renderFilmCard(filmCardContainers[0], filmCardTemplate(), MAX_MAIN_FILM_CARD);
renderFilmCard(filmCardContainers[1], filmCardTemplate(), MAX_EXTRA_FILM_CARD);
renderFilmCard(filmCardContainers[2], filmCardTemplate(), MAX_EXTRA_FILM_CARD);

render (filmCardContainers[0], showMoreButtonTemplate(), 'afterend');

render (footerStatistic, footerStatisticTemplate(), 'beforeend');
