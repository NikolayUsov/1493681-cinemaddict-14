
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
import { renderElement, isEscEvent} from './util.js';

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

  const closePopUp = () => {
    popUp .getElement().remove();
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

  const onClickOpenPopUp = (evt) => {
    evt.preventDefault();
    renderElement (footer, popUp.getElement(), 'afterend');

    document.addEventListener('keydown', onEscKeyDown);
    popUp.getButtonClose().addEventListener('click', onButtonClose);
  };

  renderElement(container, filmCard.getElement(),'beforeend');
  filmCard.getComment().addEventListener('click', onClickOpenPopUp);
  filmCard.getTitle().addEventListener('click', onClickOpenPopUp);
  filmCard.getPicture().addEventListener('click', onClickOpenPopUp);
};

const renderFilmCards = (data) => {
  mainFilmCardContainer.innerHTML = '';

  if (data.length === 0) {
    const mainContainer = filmCardContainer.getElement();
    mainContainer.innerHTML = '';
    renderElement(mainContainer, new NoFilmCardsView().getElement(), 'beforeend');

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
    renderElement(template, new filmCardView(filmCard).getElement(), 'beforeend');
  }
};


renderElement (footerStatistic, new FooterView(filmCards).getElement(), 'beforeend');


renderFilmCards(filmCards);

renderExtraFilmCard(topRaitingContainer, sortFilmCardByRaiting);
renderExtraFilmCard(topCommentedContainer, sortFilmCardByComments);

renderElement (mainFilmCardContainer, buttonShowMore.getElement(), 'afterend');

const onButtonShowMoreClick = (evt) => {
  evt.preventDefault();
  startCard += CARD_STEP;
  if (startCard >= filmCards.length) {
    startCard = filmCards.length;
    evt.target.remove();
  }
  renderFilmCards(filmCards);
};

buttonShowMore.getElement().addEventListener('click', onButtonShowMoreClick);
export {filmCardsMap};
