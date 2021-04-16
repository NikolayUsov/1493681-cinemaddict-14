import FilmCardContainer from '../view/film-card-container';
import { renderElement } from '../utils/render.js';
import EmptyFilmCard from '../view/empty-film-card';
import filmCardView from '../view/film-card';
import PopUpFilmView from '../view/popup.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import { isEscEvent } from '../utils/common.js';
import { sortByRaiting, sortByComments } from '../filters.js';

const CARD_STEP = 5;
const MAX_EXTRA_CARD = 2;
let startCard = CARD_STEP;
const footer = document.querySelector('.footer');

export default class FilmCardList {
  constructor (container) {
    this._filmCardListContainer = container;
    this._noFilmCard = new EmptyFilmCard();
    this._buttonShowMore = new ButtonShowMoreView();
    this._filmCardListWrapper = new FilmCardContainer();
    this._mainContainer = this._filmCardListWrapper.getElement().querySelector('.film-list--main');
    this._topCommentedContainer = this._filmCardListWrapper.getElement().querySelector('.films-list--top-commented');
    this._topRaitingContainer = this._filmCardListWrapper.getElement().querySelector('.films-list--raiting');
    this._handleButtonShowMore =  this._handleButtonShowMore.bind(this);
  }

  init(filmCardsMap) {
    this._filmCardsMap = new Map([...filmCardsMap]);
    this._filmCardData = Array.from(this._filmCardsMap.keys());

    renderElement (this._filmCardListContainer,  this._filmCardListWrapper, 'beforeend');
    this._renderFilmCards(this._filmCardData);
    this._renderButtonShowMore();
    this._renderExtraCard();
  }

  _sortByRaiting(map) {
    return sortByRaiting(map);
  }

  _sortByComments(map) {
    return sortByComments(map);
  }

  _renderFilmCard (container,filmCardData) {
    const filmCard = new filmCardView(filmCardData);
    const popUp = new PopUpFilmView(filmCardData);

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
  }

  _renderFilmCards (filmsData) {
    this._mainContainer.innerHTML = '';

    if (filmsData.length === 0) {
      const mainContainer =  this._filmCardListWrapper.getElement();
      mainContainer.innerHTML = '';
      renderElement(mainContainer, this._noFilmCard, 'beforeend');
      return;
    }

    let items;
    if (filmsData.length < startCard) {
      items = filmsData.length;
    } else {
      items = startCard;
    }

    for (let i = 0; i < items; i++) {
      this._renderFilmCard(this._mainContainer, filmsData[i]);
    }
  }

  _handleButtonShowMore () {
    startCard += CARD_STEP;
    if (startCard >= this._filmCardData.length) {
      startCard = this._filmCardData.length;
      this._buttonShowMore.getElement().remove();
    }

    this._renderFilmCards(this._filmCardData);
  }

  _renderExtraCard () {
    if (this._filmCardData.length === 0) {
      this._topCommentedContainer.innerHTML = '';
      this._topRaitingContainer.innerHTML = '';
      return;
    }
    const sortedByRaiting = this._sortByRaiting(this._filmCardsMap );
    const sortedByComments = this._sortByComments(this._filmCardsMap);

    sortedByRaiting
      .slice(0, MAX_EXTRA_CARD)
      .forEach((filmCard) => {
        this._renderFilmCard(this._topRaitingContainer.querySelector('.films-list__container'), filmCard);
      });

    sortedByComments
      .slice(0, MAX_EXTRA_CARD)
      .forEach((filmCard) => {
        this._renderFilmCard(this._topCommentedContainer.querySelector('.films-list__container'), filmCard);
      });
  }
  _renderButtonShowMore () {
    if (this._filmCardData.length < startCard) {
      return;
    }
    renderElement (this._mainContainer, this._buttonShowMore, 'afterend');
    this._buttonShowMore.setClick(this._handleButtonShowMore);
  }
}
