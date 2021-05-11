
import Smart from './smart-component.js';
import he from 'he';
import dayjs from 'dayjs';
import { PopUpState } from '..//utils/const.js';

const createNewCommentObj = (comment, emoji) =>{
  return {
    'comment': comment,
    'emotion': emoji,
  };
};

const popupContainerTemplate = (card, comments) => {
  const {
    title,
    rating,
    dateCreate,
    director,
    genres,
    poster,
    description,
    screenWriters,
    actors,
    userInfo,
    adult,
    country,
    originalTitle,
    runtimeMessage,
    currentEmoji,
    currentTextComment,
    isDelete,
    deleteID,
    isDisable,
  } = card;

  const { isWatchList,
    isFavorite,
    isWatched,
  } = userInfo;

  const genreTitle = genres.length > 1 ? 'Genres' : 'Genre';
  const generateGenresTemplate = () => {
    return `${genres.map((elem) => `<span class="film-details__genre">${elem}</span>`).join('')}`;
  };

  const isWatchListChecked = isWatchList ? 'checked' : '';
  const isFavoriteChecked = isFavorite ? 'checked' : '';
  const isWatchedChecked = isWatched ? 'checked' : '';

  const createCommentsList = () => {
    return `${comments.map((elem) => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${elem.emotion}.png" width="55" height="55" alt="emoji-sleeping">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(elem.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${elem.author}</span>
        <span class="film-details__comment-day">${elem.date}</span>
        <button class="film-details__comment-delete"
        data-comment-id = "${elem.id}"
        ${isDisable ? 'disabled' : ''}
        ${isDelete ? 'disabled' : ''}
        >${isDelete && deleteID === elem.id ? 'Deleting...' : 'Delete'}</button>
      </p>
    </div>
      </li>`).join('')}`;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${adult}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${screenWriters.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(dateCreate).format('D MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtimeMessage}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreTitle}</td>
              <td class="film-details__cell">
                ${generateGenresTemplate()}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"
        ${isWatchListChecked}
        ${isDisable ? 'disabled' : ''}
        >
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"
        ${isWatchedChecked}
        ${isDisable ? 'disabled' : ''}
        >
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"
        ${isFavoriteChecked}
        ${isDisable ? 'disabled' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${createCommentsList()}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${currentEmoji ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-smile">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"
            ${isDisable ? 'disabled' : ''}>${!currentTextComment ? '' : currentTextComment}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isDisable ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isDisable ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isDisable ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry"${isDisable ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
  `;
};

export default class PopUpFilmInfo extends Smart {
  constructor(data, comments) {
    super();
    this._data = PopUpFilmInfo.parseFilmCardToState(data);
    this._comments = comments;
    this._buttonCloseHandler = this._buttonCloseHandler.bind(this);
    this._controlListClickHandler = this._controlListClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._inputTextCommentHandler = this._inputTextCommentHandler.bind(this);
    this._sendNewCommentHandler = this._sendNewCommentHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return popupContainerTemplate(this._data, this._comments);
  }

  getButtonClose() {
    return this.getElement().querySelector('.film-details__close-btn');
  }

  getEmojiControls() {
    return this.getElement().querySelector('.film-details__emoji-list');
  }

  getCommentField() {
    return this.getElement().querySelector('.film-details__comment-input');
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setPopUpControlChange(this._callback.inputControlPopUp);
    this.setClickCloseButton(this._callback.clickCloseButton);
  }

  reset(filmCard) {
    this.updateData(
      PopUpFilmInfo.parseFilmCardToState(filmCard),
    );
  }

  _setInnerHandlers() {
    this.getEmojiControls().addEventListener('change', this._emojiChangeHandler);
    this.getCommentField().addEventListener('input', this._inputTextCommentHandler);
    this.getElement().addEventListener('keydown', this._sendNewCommentHandler);
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click',this._deleteCommentHandler);
  }

  _buttonCloseHandler(evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }


  _controlListClickHandler(evt) {
    evt.preventDefault();
    this._callback.inputControlPopUp(evt.target.id);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({ currentEmoji: evt.target.value });
  }

  _inputTextCommentHandler(evt) {
    evt.preventDefault();
    this.updateData(
      { currentTextComment: evt.target.value },
      false,
    );
  }

  setPopUpControlChange(callback) {
    this._callback.inputControlPopUp = callback;
    this.getElement().querySelector('.film-details__controls').addEventListener('change', this._controlListClickHandler);
  }

  setClickCloseButton(callback) {
    this._callback.clickCloseButton = callback;
    this.getButtonClose().addEventListener('click', this._buttonCloseHandler);
  }

  _sendNewCommentHandler(evt) {
    const isRightKeys = (evt.ctrlKey || evt.metaKey) && evt.keyCode === 13;
    const isHasTextContentAndEmoji = !this._data.currentEmoji || !this._data.currentTextComment.trim();

    if (isRightKeys && !isHasTextContentAndEmoji) {
      this._callback.setSendNewComment(this._data, createNewCommentObj(this._data.currentTextComment, this._data.currentEmoji));
      this._data = PopUpFilmInfo.parseStateToFilmCard(this._data);
      this.updateElement();
    }
  }

  _deleteCommentHandler(evt) {
    if (!evt.target.classList.contains('film-details__comment-delete')) {
      return;
    }
    evt.preventDefault();
    this._callback.deleteComment(evt.target.dataset.commentId);
  }

  setSendNewComment(callback) {
    this._callback.setSendNewComment = callback;
  }

  setDeleteComment (callback) {
    this._callback.deleteComment = callback;
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this._scroll = this.getElement().scrollTop;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.getElement().scrollTop = this._scroll;
    this.restoreHandlers();
  }

  updateData(update, isUpdateNow = true, comments = '') {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (comments) {
      this._comments = comments.slice();
    }


    if (!isUpdateNow) {
      return;
    }
    this.updateElement();
  }

  setState (state, deleteID) {
    switch (state){
      case PopUpState.DISABLED:
        this.updateData(
          {
            isDisable: true,
          },
        );
        break;
      case PopUpState.DELETE:
        this.updateData(
          {
            isDelete: true,
            deleteID: deleteID,
          },
        );
        break;
      case PopUpState.DEFAULT:
        this.updateData(
          {
            isDisable: false,
            isDelete: false,
          },
        );
        break;
      case PopUpState.ABORTING:
        this.updateData(
          {
            isDisable: false,
            isDelete: false,
          },
        );
        this.errorUI();
    }
  }

  static parseFilmCardToState(filmCard) {
    return Object.assign(
      {},
      filmCard,
      {
        currentEmoji: 'currentEmoji' in filmCard,
        currentTextComment: '',
        isDelete: false,
        isSave: false,
        isDisable: false,
        deleteID: '',
      },
    );
  }

  static parseStateToFilmCard(filmCard) {
    filmCard = Object.assign({}, filmCard);
    delete filmCard.currentTextComment;
    delete filmCard.currentEmoji;
    delete filmCard.isDelete;
    delete filmCard.isSave;
    delete filmCard.isDisable;
    delete filmCard.deleteID;
    return filmCard;
  }
}
