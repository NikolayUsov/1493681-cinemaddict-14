import FilmCardContainer from '../view/film-card-container';
import { renderElement } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import EmptyFilmCard from '../view/empty-film-card';
import FilmCardPresenter from './film-card-presenter.js';
import ButtonShowMoreView from '../view/button-show-more.js';
import { sortByRaiting, sortByComments } from '../filters.js';

const CARD_STEP = 5;
const MAX_EXTRA_CARD = 2;
const startCard = CARD_STEP;

export default class FilmCardList {
  constructor (container) {
    this._filmCardListContainer = container;
    this._noFilmCard = new EmptyFilmCard();
    this._buttonShowMore = new ButtonShowMoreView();
    this._filmCardListWrapper = new FilmCardContainer();
    this._renderedCard = startCard;
    this._mainContainer = this._filmCardListWrapper.getElement().querySelector('.film-list--main');
    this._topCommentedContainer = this._filmCardListWrapper.getElement().querySelector('.films-list--top-commented');
    this._topRaitingContainer = this._filmCardListWrapper.getElement().querySelector('.films-list--raiting');
    this._handleButtonShowMore =  this._handleButtonShowMore.bind(this);
    this._handlerChangeData = this._handlerChangeData.bind(this);
    this._mainFilmCardPresenters = {};
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
    this._filmCardPresenter = new FilmCardPresenter(container, this._handlerChangeData);
    this._filmCardPresenter.init(filmCardData);
  }

  _renderFilmCards (filmsData) {
    this._clearFilmCard();

    if (filmsData.length === 0) {
      const mainContainer =  this._filmCardListWrapper.getElement();
      mainContainer.innerHTML = '';
      renderElement(mainContainer, this._noFilmCard, 'beforeend');
      return;
    }


    if (filmsData.length < this._renderedCard) {
      this._renderedCard = filmsData.length;
    }

    for (let i = 0; i < this._renderedCard; i++) {
      this._renderFilmCard(this._mainContainer, filmsData[i]);
      this._mainFilmCardPresenters[filmsData[i].id] = this._filmCardPresenter;
    }
  }

  _clearFilmCard () {
    Object.values(this._mainFilmCardPresenters)
      .forEach((filmCard) => {
        filmCard.destroy();});
    this._mainFilmCardPresenters = {};
  }

  _resetFilmCardList () {
    this._clearFilmCard();
    this._renderedCard = CARD_STEP;
  }

  _handlerChangeData (updateFilmCard) {
    console.log(this._filmCardData);
    this._filmCardData = updateItem(this._filmCardData, updateFilmCard);
    console.log('update:',this._filmCardData);
    this._clearFilmCard();
    this._renderFilmCards(this._filmCardData);
  }

  _handleButtonShowMore () {
    this._renderedCard += CARD_STEP;
    if (this._renderedCard >= this._filmCardData.length) {
      this._renderedCard = this._filmCardData.length;
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