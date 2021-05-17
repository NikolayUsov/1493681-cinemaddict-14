import FilmCardView from '../view/film-card';
import PopupFilmView from '../view/popup-film-info.js';
import { renderElement } from '../utils/render.js';
import { isEscEvent } from '../utils/common.js';
import { remove, replace } from '../utils/render.js';
import { deepClone } from '../utils/common.js';
import { RenderPosition } from '../utils/render.js';
import { UpdateType, UserAction, PopupStatus, PopupState } from '../utils/const.js';
import { FilterTypeMatchToFilmsControl } from '../utils/filter-utils';
import { showToast, ToastMessage } from '../utils/toast.js';
import dayjs from 'dayjs';

const PopupControlType = {
  FAVORITE: 'favorite',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
};

const UserInfoControlsType = {
  IS_WATCHLIST: 'isWatchList',
  IS_WATCHED: 'isWatched',
  IS_FAVORITE: 'isFavorite',
};

const footer = document.querySelector('.footer');

export default class FilmCardPresenter {
  constructor(container, handlerChangeData, handlerChangeView, filterModel, renderExtraCard, api) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmCardComponent = null;
    this._popupComponent = null;
    this._comments = null;
    this._api = api;
    this._renderExtraCard = renderExtraCard;
    this._isChangeComment = false;
    this._minorUpdateAfterClose = false;
    this._handlerChangeData = handlerChangeData;
    this._handlerChangeView = handlerChangeView;
    this._popupStatus = PopupStatus.CLOSE;
    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePopupButtonClose = this._handlePopupButtonClose.bind(this);
    this._handlerAddToWatchList = this._handlerAddToWatchList.bind(this);
    this._handlerAddToFavorits = this._handlerAddToFavorits.bind(this);
    this._handlerAddToWatched = this._handlerAddToWatched.bind(this);
    this._handlerChangePopupControlButton = this._handlerChangePopupControlButton.bind(this);
    this._handlerSendNewComment = this._handlerSendNewComment.bind(this);
    this._handlerDeleteComment = this._handlerDeleteComment.bind(this);
  }

  init(filmCardData) {
    this._filmInfo = filmCardData;
    const prevFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(this._filmInfo);
    this._filmCardComponent.setFilmCardWatchListClick(this._handlerAddToWatchList);
    this._filmCardComponent.setFilmCardClick(this._handleOpenPopup);
    this._filmCardComponent.setFilmCardFavoritsClick(this._handlerAddToFavorits);
    this._filmCardComponent.setFilmCardWatchedClick(this._handlerAddToWatched);


    if (prevFilmCardComponent === null) {
      renderElement(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._popupStatus ===  PopupStatus.CLOSE) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._popupStatus === PopupStatus.OPEN) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._popupComponent.updateData(this._filmInfo, true, this._comments);
    }
  }

  destroy() {
    remove(this._filmCardComponent);

  }

  SetErrorUpdate() {
    this._filmCardComponent.showErrorUI();
  }

  resetFilmView() {
    if (this._popupStatus === PopupStatus.OPEN) {
      this._closePopup();
      this._popupStatus = PopupStatus.CLOSE;
    }
  }

  _closePopup() {
    this._popupComponent.getElement().remove();
    this._popupComponent.removeElement();
    this._popupComponent.reset(this._filmInfo);
    this._popupStatus = PopupStatus.CLOSE;
    this._comments = null;
    document.body.style.overflow = '';

    if (this._minorUpdateAfterClose) {
      this._handlerChangeData(UserAction.UPDATE, UpdateType.MINOR, this._updateFilmCard, this._filmInfo, this._popupStatus);
    }

    if (this._isChangeComment) {
      this._renderExtraCard();
      this._isChangeComment = false;
    }
  }

  _openPopup() {
    this._api.getComments(this._filmInfo.id)
      .then((comments) => {
        this._comments = comments;
        this._popupComponent = new PopupFilmView(this._filmInfo, this._comments);
        renderElement(footer, this._popupComponent, RenderPosition.AFTEREND);
        if (!this._api.isOnline()) {
          showToast(ToastMessage.OPEN_POP_UP);
        }
        this._popupComponent.setClickCloseButton(this._handlePopupButtonClose);
        this._popupComponent.setPopupControlChange(this._handlerChangePopupControlButton);
        this._popupComponent.setSendNewComment(this._handlerSendNewComment);
        this._popupComponent.setDeleteComment(this._handlerDeleteComment);
        document.body.style.overflow = 'hidden';
      })
      .catch(() => {
        this._filmCardComponent.showErrorUI();
      });
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      this._closePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleOpenPopup() {
    this._handlerChangeView();
    this._openPopup();
    this._popupStatus = PopupStatus.OPEN;
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePopupButtonClose() {
    this._closePopup();
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }


  _handlerChangePopupControlButton(buttonType) {
    if (buttonType === PopupControlType.WATCHLIST) {
      this._updateFilmCardUserInfo(UserInfoControlsType.IS_WATCHLIST);
    }

    if (buttonType === PopupControlType.FAVORITE) {
      this._updateFilmCardUserInfo(UserInfoControlsType.IS_FAVORITE);
    }

    if (buttonType === PopupControlType.WATCHED) {
      this._updateFilmCardUserInfo(UserInfoControlsType.IS_WATCHED);
    }
  }

  _updateFilmCardUserInfo(updateControl) {
    const currentFilter = this._filterModel.get();
    this._updateFilmCard = deepClone(this._filmInfo);
    this._updateFilmCard.userInfo[updateControl] = !this._updateFilmCard.userInfo[updateControl];

    if (updateControl === UserInfoControlsType.IS_WATCHED) {
      this._updateFilmCard.userInfo[updateControl] ? this._updateFilmCard.userInfo.watchedDate = dayjs() : this._updateFilmCard.userInfo.watchedDate = null;
    }

    if (FilterTypeMatchToFilmsControl[currentFilter] === updateControl && this._popupStatus === PopupStatus.OPEN) {
      this._minorUpdateAfterClose = true;
    }
    this._handlerChangeData(UserAction.UPDATE, UpdateType.PATH, this._updateFilmCard, updateControl, this._popupStatus);
  }

  _handlerAddToWatchList() {
    this._updateFilmCardUserInfo(UserInfoControlsType.IS_WATCHLIST);
  }

  _handlerAddToFavorits() {
    this._updateFilmCardUserInfo(UserInfoControlsType.IS_FAVORITE);
  }

  _handlerAddToWatched() {
    this._updateFilmCardUserInfo(UserInfoControlsType.IS_WATCHED);
  }

  _handlerSendNewComment(updateFilmCard, comment) {
    this._popupComponent.setState(PopupState.DISABLED);
    this._api.addComment(updateFilmCard, comment)
      .then((result) => {
        this._comments = result.comments;
        this._handlerChangeData(UserAction.DELETE_COMMENT, UpdateType.PATH, result.film, '', this._popupStatus);
        this._isChangeComment = true;
        this._popupComponent.setState(PopupState.DEFAULT);
      })
      .catch(() => {
        if (!this._api.isOnline()) {
          showToast(ToastMessage.OFFLINE_SEND_COMMENT);
        }
        this._popupComponent.updateData(
          {
            currentEmoji: comment.emotion,
            currentTextComment: comment.comment,
          },
        );
        this._popupComponent.setState(PopupState.ABORTING);

      });
  }

  _handlerDeleteComment(commnetID) {
    this._popupComponent.setState(PopupState.DELETE, commnetID);
    this._api.deleteComment(commnetID)
      .then(() => {
        const updatedFilmCard = deepClone(this._filmInfo);
        const comment = updatedFilmCard.comments.filter((comment) => comment !== commnetID);
        updatedFilmCard.comments = comment;
        this._comments = this._comments.filter((comment) => comment.id !== commnetID);
        this._handlerChangeData(UserAction.DELETE_COMMENT, UpdateType.PATH, updatedFilmCard, '', this._popupStatus);
        this._isChangeComment = true;
        this._popupComponent.setState(PopupState.DEFAULT);
      })
      .catch(() => {
        if (!this._api.isOnline()) {
          showToast(ToastMessage.OFFLINE_DELETE_COMMENT);
        }
        this._popupComponent.setState(PopupState.ABORTING);
      });
  }
}

