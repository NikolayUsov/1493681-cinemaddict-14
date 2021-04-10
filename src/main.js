
import ProfileView from './view/profile.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort.js';
import FilmCardContainerView from './view/film-card-container.js';
import ButtonShowMoreView from './view/button-show-more.js';
import filmCardView from './view/film-card';
import FooterView from './view/footer-statistic.js';
import PopUpFilmView from './view/popup.js';
import { filmCardsMap } from './mock/data.js';
import { sortByRaiting, sortByComments } from './filters.js';
import { renderElement } from './util.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStatistic = document.querySelector('.footer__statistics');
const footer = document.querySelector('.footer');

const CARD_STEP = 5;
let startCard = CARD_STEP;

const filmCards = Array.from(filmCardsMap.keys());
const sortFilmCardByRaiting = sortByRaiting(filmCardsMap);
const sortFilmCardByComments = sortByComments(filmCardsMap);
const filmCardContainer = new FilmCardContainerView();

renderElement (header, new ProfileView(filmCards).getElement(), 'beforeend');
renderElement (main, new FilterView(filmCards).getElement(), 'beforeend');
renderElement (main, new SortView().getElement(), 'beforeend');
renderElement (main, filmCardContainer.getElement(), 'beforeend');

const mainFilmCardContainer = filmCardContainer.getElement().querySelector('.film-list--main');
const topRaitingContainer = document.querySelector('.films-list--raiting').querySelector('.films-list__container');

const topCommentedContainer = document.querySelector('.films-list--top-commented').querySelector('.films-list__container');

const renderFilmCard = (container,filmData) =>{
  const filmCard = new filmCardView(filmData);
  const popUp = new PopUpFilmView(filmData);

  const link = filmCard.getElement().querySelector('.film-card__comments');

  const onClickFilmCard = () => {
    renderElement (footer, popUp.getElement(), 'afterend');
    popUp.getButtonClose().addEventListener('click', () => {
      popUp .getElement().remove();
      popUp.removeElement();
    });
  };

  renderElement(container, filmCard.getElement(),'beforeend');
  link.addEventListener('click', onClickFilmCard);

};

const renderFilmCards = (data) => {
  mainFilmCardContainer.innerHTML = '';

  let items;
  if (filmCards.length < startCard) {
    items = filmCards.length;
  } else {
    items = startCard;
  }

  for (let i = 0; i < items; i++) {
    renderFilmCard(mainFilmCardContainer,data[i]);
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
