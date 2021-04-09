
import ProfileView from './view/profile.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort.js';
import FilmCardContainerView from './view/film-card-container.js';
import ButtonShowMoreView from './view/button-show-more.js';
import filmCardView from './view/film-card';
import FooterView from './view/footer-statistic.js';
import { popupContainerTemplate } from './view/popup.js';
import { filmCardsMap } from './mock/data.js';
import { sortByRaiting, sortByComments } from './filters.js';
import { render,renderElement } from './util.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const footer = document.querySelector('.footer');

const CARD_STEP = 5;
let startCard = CARD_STEP;

const filmCards = Array.from(filmCardsMap.keys());
const sortFilmCardByRaiting = sortByRaiting(filmCardsMap);
const sortFilmCardByComments = sortByComments(filmCardsMap);


renderElement (header, new ProfileView(filmCards).getElement(), 'beforeend');
renderElement (main, new FilterView(filmCards).getElement(), 'beforeend');
renderElement (main, new SortView().getElement(), 'beforeend');
renderElement (main, new FilmCardContainerView().getElement(), 'beforeend');

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
    renderElement(mainFilmCardContainer, new filmCardView(filmCard).getElement(), 'beforeend');
  }
};

const renderExtraFilmCard = (template, data) => {
  const MAX_EXTRA_CARD =2;
  for (let i = 0; i < MAX_EXTRA_CARD; i++) {
    const filmCard = data[i];
    renderElement(template, new filmCardView(filmCard).getElement(), 'beforeend');
  }
};

renderElement (footerStatistic, new FooterView(filmCards).getElement(), 'beforeend');

// Рендер попапа
render (footer, popupContainerTemplate(filmCards[0]),'afterend');

renderFilmCards(filmCards);

renderExtraFilmCard(topRaitingContainer, sortFilmCardByRaiting);
renderExtraFilmCard(topCommentedContainer, sortFilmCardByComments);

renderElement (mainFilmCardContainer, new ButtonShowMoreView().getElement(), 'afterend');
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
