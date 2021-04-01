
import { headerProfileTemplate } from './view/profile.js';
import { mainNavigationTemplate } from './view/navigation.js';
import { mainFilterTemplate } from './view/filter.js';
import { filmListcontainerTemplate, filmCardTemplate, showMoreButtonTemplate } from './view/film-list-container.js';
import { footerStatisticTemplate } from './view/footer-statistic.js';
import { popupContainerTemplate, commentTemplate} from './view/popup.js';
import './mock/film.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const footer = document.querySelector('.footer');

const MAX_MAIN_FILM_CARD = 5;
const MAX_EXTRA_FILM_CARD = 2;
const DEFOULT_COMMENTS_COUNTER = 4;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderSomeElements = (container, template, items, place = 'beforeend') => {
  for (let i = 1; i <= items; i++) {
    render(container, template, place);
  }
};

render (header, headerProfileTemplate(), 'beforeend');
render (main, mainNavigationTemplate(), 'beforeend');
render (main, mainFilterTemplate(), 'beforeend');
render (main, filmListcontainerTemplate(), 'beforeend');

// Задать вопрос в ПП про данное решение
const filmCardContainers = document.querySelectorAll('.films-list__container');
// Задать вопрос о целесообразности использовать индексы
renderSomeElements(filmCardContainers[0], filmCardTemplate(), MAX_MAIN_FILM_CARD);
renderSomeElements(filmCardContainers[1], filmCardTemplate(), MAX_EXTRA_FILM_CARD);
renderSomeElements(filmCardContainers[2], filmCardTemplate(), MAX_EXTRA_FILM_CARD);

render (filmCardContainers[0], showMoreButtonTemplate(), 'afterend');

render (footerStatistic, footerStatisticTemplate(), 'beforeend');


// Рендер попапа
render (footer, popupContainerTemplate(),'afterend');
renderSomeElements(document.querySelector('.film-details__comments-list'), commentTemplate(), DEFOULT_COMMENTS_COUNTER);
