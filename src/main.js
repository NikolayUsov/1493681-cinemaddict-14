
import ProfileView from './view/profile.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort.js';
import FilmCardContainerView from './view/film-card-container.js';
import ButtonShowMoreView from './view/button-show-more.js';
import filmCardView from './view/film-card';
import FooterView from './view/footer-statistic.js';
import PopUpFilmView from './view/popup.js';
import NoFilmCardsView from './view/empty-film-card.js';
import { filmCardsMap } from './mock/data.js';
import { sortByRaiting, sortByComments } from './filters.js';
import { renderElement } from './utils/render.js';
import { isEscEvent } from './utils/common.js';

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
const buttonShowMore = new ButtonShowMoreView();

renderElement (header, new ProfileView(filmCards), 'beforeend');
renderElement (main, new FilterView(filmCards), 'beforeend');
renderElement (main, new SortView(), 'beforeend');
renderElement (main, filmCardContainer, 'beforeend');

const mainFilmCardContainer = filmCardContainer.getElement().querySelector('.film-list--main');
const topRaitingContainer = document.querySelector('.films-list--raiting').querySelector('.films-list__container');
const topCommentedContainer = document.querySelector('.films-list--top-commented').querySelector('.films-list__container');

const renderFilmCard = (container,filmData) =>{
  const filmCard = new filmCardView(filmData);
  const popUp = new PopUpFilmView(filmData);

  const closePopUp = () => {
    popUp.getElement().remove();
    popUp.removeElement();
  };

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      closePopUp();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onButtonClose = () => {
    closePopUp();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const onClickOpenPopUp = () => {
    renderElement (footer, popUp, 'afterend');

    document.addEventListener('keydown', onEscKeyDown);
    popUp.setClickCloseButton( onButtonClose );
  };

  renderElement(container, filmCard, 'beforeend');

  filmCard.setFilmCardClick( onClickOpenPopUp );
};

const renderFilmCards = (data) => {
  mainFilmCardContainer.innerHTML = '';

  if (data.length === 0) {
    const mainContainer = filmCardContainer.getElement();
    mainContainer.innerHTML = '';
    renderElement(mainContainer, new NoFilmCardsView(), 'beforeend');

    return;
  }

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
  if (data.length === 0 ) {
    return;
  }

  const MAX_EXTRA_CARD =2;
  for (let i = 0; i < MAX_EXTRA_CARD; i++) {
    const filmCard = data[i];
    renderElement(template, new filmCardView(filmCard), 'beforeend');
  }
};


renderElement (footerStatistic, new FooterView(filmCards), 'beforeend');


renderFilmCards(filmCards);

renderExtraFilmCard(topRaitingContainer, sortFilmCardByRaiting);
renderExtraFilmCard(topCommentedContainer, sortFilmCardByComments);

renderElement (mainFilmCardContainer, buttonShowMore, 'afterend');

const onButtonShowMoreClick = () => {
  startCard += CARD_STEP;
  if (startCard >= filmCards.length) {
    startCard = filmCards.length;
    buttonShowMore.getElement().remove();
  }
  renderFilmCards(filmCards);
};

buttonShowMore.setClick(onButtonShowMoreClick);
export {filmCardsMap};
