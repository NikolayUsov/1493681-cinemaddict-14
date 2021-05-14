import FilmCardView from '../view/film-card';
import PopUpFilmView from '../view/popup.js';
import { renderElement } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { remove, replace } from '../utils/render.js';
import { deepClone } from '../utils/common.js';
import { RenderPosition } from '../utils/render.js';
import { UpdateType, UserAction, PopUpStatus, PopUpState } from '../utils/const.js';
import { FilterTypeMatchToFilmsControl } from '../utils/filter-utils';
import { toast, ToastMessages } from '../utils/toast.js';

const PopUpControlType = {
  FAVORITE: 'favorite',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
};


const footer = document.querySelector('.footer');


export default class FilmCardPresenter {
  constructor(container, handlerChangeData, handlerChangeView, filterModel, renderExtraCard, api) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmCardComponent = null;
    this._popUpComponent = null;
    this._comments = null;
    this._api = api;
    this._renderExtraCard = renderExtraCard;
    this._isChangeComment = false;
    this._handlerChangeData = handlerChangeData;
    this._handlerChangeView = handlerChangeView;
    this._popUpStatus = PopUpStatus.CLOSE;
    this._handleOpenPopUp = this._handleOpenPopUp.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePopUpButtonClose = this._handlePopUpButtonClose.bind(this);
    this._handlerAddToWatchList = this._handlerAddToWatchList.bind(this);
    this._handlerAddToFavorits = this._handlerAddToFavorits.bind(this);
    this._handlerAddToWatched = this._handlerAddToWatched.bind(this);
    this._handlerChangePopUpControlButton = this._handlerChangePopUpControlButton.bind(this);
    this._handlerSendNewComment = this._handlerSendNewComment.bind(this);
    this._handlerDeleteComment = this._handlerDeleteComment.bind(this);
  }

  init(filmCardData) {
    this._filmInfo = filmCardData;
    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(this._filmInfo);
    this._filmCardComponent.setFilmCardWatchListClick(this._handlerAddToWatchList);
    this._filmCardComponent.setFilmCardClick(this._handleOpenPopUp);
    this._filmCardComponent.setFilmCardFavoritsClick(this._handlerAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick(this._handlerAddToWatched);


    if (prevFilmCardComponent === null) {
      renderElement(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._popUpStatus === PopUpStatus.CLOSE) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._popUpStatus === PopUpStatus.OPEN) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._popUpComponent.updateData(this._filmInfo, true, this._comments);
    }
  }

  destroy() {
    remove(this._filmCardComponent);

  }

  errorUpdate(){
    this._filmCardComponent.errorUI();
  }

  resetFilmView() {
    if (this._popUpStatus === PopUpStatus.OPEN) {
      this._closePopUp();
      this._popUpStatus = PopUpStatus.CLOSE;
    }
  }

  _closePopUp() {
    this._popUpComponent.getElement().remove();
    this._popUpComponent.removeElement();
    this._popUpComponent.reset(this._filmInfo);
    this._popUpStatus = PopUpStatus.CLOSE;
    this._comments = null;
    document.body.style.overflow = '';
    if (this._isChangeComment) {
      this._renderExtraCard();
      this._isChangeComment = false;
    }
  }

  _openPopUp() {
    this._api.getComments(this._filmInfo.id)
      .then((comments) => {
        this._comments = comments;
        this._popUpComponent = new PopUpFilmView(this._filmInfo, this._comments);
        renderElement(footer, this._popUpComponent, RenderPosition.AFTEREND);
        if (!this._api.isOnline()){
          toast(ToastMessages.OPEN_POP_UP);
        }
        this._popUpComponent.setClickCloseButton(this._handlePopUpButtonClose);
        this._popUpComponent.setPopUpControlChange(this._handlerChangePopUpControlButton);
        this._popUpComponent.setSendNewComment(this._handlerSendNewComment);
        this._popUpComponent.setDeleteComment(this._handlerDeleteComment);
        document.body.style.overflow = 'hidden';
      })
      .catch(() => {
        this._filmCardComponent.errorUI();
      });
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      this._closePopUp();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopUp() {
    this._handlerChangeView();
    this._openPopUp();
    this._popUpStatus = PopUpStatus.OPEN;
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopUpButtonClose() {
    this._closePopUp();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }


  _handlerChangePopUpControlButton(buttonType) {
    if (buttonType === PopUpControlType.WATCHLIST) {
      this._updateFilmCardUserInfo('isWatchList');
    }

    if (buttonType === PopUpControlType.FAVORITE) {
      this._updateFilmCardUserInfo('isFavorite');
    }

    if (buttonType === PopUpControlType.WATCHED) {
      this._updateFilmCardUserInfo('isWatched');
    }
  }

  _updateFilmCardUserInfo(updateControl) {
    const currentFilter = this._filterModel.get();
    this._updateFilmCard = deepClone(this._filmInfo);
    this._updateFilmCard.userInfo[updateControl] = !this._updateFilmCard.userInfo[updateControl];
    if (FilterTypeMatchToFilmsControl[currentFilter] === updateControl && this._popUpStatus === PopUpStatus.OPEN) {
      this._closePopUp();
    }
    this._handlerChangeData(UserAction.UPDATE, UpdateType.PATH, this._updateFilmCard, updateControl, this._popUpStatus);
  }

  _handlerAddToWatchList() {
    this._updateFilmCardUserInfo('isWatchList');
  }

  _handlerAddToFavorits() {
    this._updateFilmCardUserInfo('isFavorite');
  }

  _handlerAddToWatched() {
    this._updateFilmCardUserInfo('isWatched');
  }

  _handlerSendNewComment(updateFilmCard, comment) {
    this._popUpComponent.setState(PopUpState.DISABLED);
    this._api.addComment(updateFilmCard, comment)
      .then((result) =>{
        this._comments = result.comments;
        this._handlerChangeData(UserAction.DELETE_COMMENT, UpdateType.PATH, result.film, '', this._popUpStatus);
        this._isChangeComment = true;
        this._popUpComponent.setState(PopUpState.DEFAULT);
      })
      .catch(() => {
        if (!this._api.isOnline()){
          toast(ToastMessages.OFFLINE_SEND_COMMENT);
        }
        this._popUpComponent.updateData(
          {
            currentEmoji: comment.emotion,
            currentTextComment: comment.comment,
          },
        );
        this._popUpComponent.setState(PopUpState.ABORTING);

      });
  }

  _handlerDeleteComment(commnetID) {
    this._popUpComponent.setState(PopUpState.DELETE, commnetID);
    this._api.deleteComment(commnetID)
      .then(() => {
        const updatedFilmCard = deepClone(this._filmInfo);
        const comment = updatedFilmCard.comments.filter((comment) => comment !== commnetID);
        updatedFilmCard.comments = comment;
        this._comments = this._comments.filter((comment) => comment.id !== commnetID);
        this._handlerChangeData(UserAction.DELETE_COMMENT, UpdateType.PATH, updatedFilmCard, '', this._popUpStatus);
        this._isChangeComment = true;
        this._popUpComponent.setState(PopUpState.DEFAULT);
      })
      .catch(() => {
        if (!this._api.isOnline()){
          toast(ToastMessages.OFFLINE_DELETE_COMMENT);
        }
        this._popUpComponent.setState(PopUpState.ABORTING);
      });
  }
}

