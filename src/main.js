
import { headerProfileTemplate } from './view/profile.js';
import { mainNavigationTemplate } from './view/navigation.js';
import { mainFilterTemplate } from './view/filter.js';
import { filmListcontainerTemplate, filmCardTemplate, showMoreButtonTemplate } from './view/film-card.js';
import { footerStatisticTemplate } from './view/footer-statistic.js';
import { popupContainerTemplate } from './view/popup.js';
import { filmCardsMap } from './mock/data.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const footer = document.querySelector('.footer');


const MAX_MAIN_FILM_CARD = 5;
/* const DEFOULT_COMMENTS_COUNTER = 4; */

const filmCards = Array.from(filmCardsMap.keys());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render (header, headerProfileTemplate(), 'beforeend');
render (main, mainNavigationTemplate(filmCards), 'beforeend');
render (main, mainFilterTemplate(), 'beforeend');
render (main, filmListcontainerTemplate(), 'beforeend');

// Задать вопрос в ПП про данное решение
const mainFilmCardContainer = document.querySelector('.film-list--main');
const filmCardContainers = document.querySelectorAll('.films-list__container');
// Задать вопрос о целесообразности использовать индексы

const renderFilmCards = () => {
  for (let i = 0; i < filmCards.length; i++) {
    const filmCard = filmCards[i];
    render(mainFilmCardContainer, filmCardTemplate(filmCard), 'beforeend');
    if (i === MAX_MAIN_FILM_CARD) {
      break;
    }
  }
};

//renderSomeElements(filmCardContainers[0], filmCardTemplate(), MAX_MAIN_FILM_CARD);
//renderSomeElements(filmCardContainers[1], filmCardTemplate(), MAX_EXTRA_FILM_CARD);
//renderSomeElements(filmCardContainers[2], filmCardTemplate(), MAX_EXTRA_FILM_CARD);

render (filmCardContainers[0], showMoreButtonTemplate(), 'afterend');
render (footerStatistic, footerStatisticTemplate(), 'beforeend');

// Рендер попапа
render (footer, popupContainerTemplate(filmCards[0]),'afterend');

renderFilmCards();

export {filmCardsMap};
