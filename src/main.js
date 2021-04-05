
import { headerProfileTemplate } from './view/profile.js';
import { mainNavigationTemplate } from './view/navigation.js';
import { mainFilterTemplate } from './view/filter.js';
import { filmListcontainerTemplate, filmCardTemplate, showMoreButtonTemplate } from './view/film-card.js';
import { footerStatisticTemplate } from './view/footer-statistic.js';
import { popupContainerTemplate } from './view/popup.js';
import { filmCardsMap } from './mock/data.js';
import { sortByRaiting, sortByComments } from './filters.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const footer = document.querySelector('.footer');

const CARD_STEP = 5;
let startCard = CARD_STEP;

const filmCards = Array.from(filmCardsMap.keys());
const sortFilmCardByRaiting = sortByRaiting(filmCardsMap);
const sortFilmCardByComments = sortByComments(filmCardsMap);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render (header, headerProfileTemplate(), 'beforeend');
render (main, mainNavigationTemplate(filmCards), 'beforeend');
render (main, mainFilterTemplate(), 'beforeend');
render (main, filmListcontainerTemplate(), 'beforeend');

const mainFilmCardContainer = document.querySelector('.film-list--main');
const topRaitingContainer = document.querySelector('.films-list--raiting').querySelector('.films-list__container');
const topCommentedContainer = document.querySelector('.films-list--top-commented').querySelector('.films-list__container');

const renderFilmCards = (data) => {
  mainFilmCardContainer.innerHTML = '';

  let items;
  if (filmCards.length < startCard) {
    items = filmCards.length;
  } else {
    items = startCard;
  }

  for (let i = 0; i < items; i++) {
    const filmCard = data[i];
    render(mainFilmCardContainer, filmCardTemplate(filmCard), 'beforeend');
  }
};

const renderExtraFilmCard = (template, data) => {
  const MAX_EXTRA_CARD =2;
  for (let i = 0; i < MAX_EXTRA_CARD; i++) {
    const filmCard = data[i];
    render(template, filmCardTemplate(filmCard), 'beforeend');
  }
};

render (footerStatistic, footerStatisticTemplate(), 'beforeend');
// Рендер попапа
render (footer, popupContainerTemplate(filmCards[0]),'afterend');

renderFilmCards(filmCards);

renderExtraFilmCard(topRaitingContainer, sortFilmCardByRaiting);
renderExtraFilmCard(topRaitingContainer, sortFilmCardByRaiting);
renderExtraFilmCard(topCommentedContainer, sortFilmCardByComments);

render (mainFilmCardContainer, showMoreButtonTemplate(), 'afterend');
const buttonShowMore = document.querySelector('.films-list__show-more');

const onButtonShowMoreClick = (evt) => {
  evt.preventDefault();
  startCard += CARD_STEP;
  if (startCard >= filmCards.length) {
    startCard = filmCards.length;
    evt.target.remove();
  }
  renderFilmCards(filmCards);
};

buttonShowMore.addEventListener('click', onButtonShowMoreClick);
export {filmCardsMap};
