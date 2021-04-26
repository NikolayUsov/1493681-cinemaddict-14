
import Smart from './smart-component.js';
import {generateCommetData} from '../mock/comment-mock.js';


const popupContainerTemplate = (card) => {

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
    comments,
    currentEmoji,
    currentTextComment,
  } = card;

  const {isWatchList,
    isFavorite,
    isWatched,
  } = userInfo;

  const genreTitle = genres.length > 1 ? 'Genres': 'Genre';
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
      <p class="film-details__comment-text">${elem.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${elem.author}</span>
        <span class="film-details__comment-day">${elem.diffmessage}</span>
        <button class="film-details__comment-delete">Delete</button>
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
              <td class="film-details__cell">${dateCreate.format('D MMMM YYYY')}</td>
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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchListChecked}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatchedChecked}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoriteChecked}>
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
          ${currentEmoji ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-smile">`: ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!currentTextComment ? '' : currentTextComment}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
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
  constructor (data) {
    super();
    this._data = PopUpFilmInfo.parseFilmCardToState(data);
    this._handlerButtonClose = this._handlerButtonClose.bind(this);
    this._handlerControlButton = this._handlerControlButton.bind(this);
    this._handlerEmojiChange = this._handlerEmojiChange.bind(this);
    this._handlerInputCommentText = this._handlerInputCommentText.bind(this);
    this._handlerSendNewComment = this._handlerSendNewComment.bind(this);
    this._setInnerHandlers();
  }

  getTemplate () {
    return popupContainerTemplate(this._data);
  }

  getButtonClose () {
    return this.getElement().querySelector('.film-details__close-btn');
  }

  getEmojiControls () {
    return this.getElement().querySelector('.film-details__emoji-list');
  }

  getCommentTextContent () {
    return this.getElement().querySelector('.film-details__comment-input');
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setPopUpControlChange(this._callback.inputControlPopUp);
    this.setClickCloseButton (this._callback.clickCloseButton);
  }

  reset(filmCard) {
    this.updateData(
      PopUpFilmInfo.parseFilmCardToState(filmCard),
    );
  }

  _setInnerHandlers () {
    this.getEmojiControls().addEventListener('change', this._handlerEmojiChange);
    this.getCommentTextContent().addEventListener('input', this._handlerInputCommentText);
    this.getElement().addEventListener('keydown', this._handlerSendNewComment);
  }

  _handlerButtonClose (evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }


  _handlerControlButton(evt) {
    evt.preventDefault();
    this._callback.inputControlPopUp(evt.target.id);
  }

  _handlerEmojiChange (evt) {
    evt.preventDefault();
    this.updateData({currentEmoji: evt.target.value});
  }

  _handlerInputCommentText (evt) {
    evt.preventDefault();
    this.updateData(
      {currentTextComment: evt.target.value},
      false,
    );
  }

  setPopUpControlChange (callback) {
    this._callback.inputControlPopUp = callback;
    this.getElement().querySelector('.film-details__controls').addEventListener('change', this._handlerControlButton);
  }

  setClickCloseButton (callback) {
    this._callback.clickCloseButton = callback;
    this.getButtonClose().addEventListener('click', this._handlerButtonClose);
  }

  _handlerSendNewComment (evt) {
    if (evt.ctrlKey && evt.keyCode == 13) {
      if ( !this._data.currentEmoji || !this._data.currentTextComment){
        return;
      }
      this._data = PopUpFilmInfo.parseStateToFilmCard(this._data);
      this._callback.setSendNewComment(this._data);
      this.updateElement();
    }
  }

  setSendNewComment (callback) {
    this._callback.setSendNewComment = callback;
  }

  static parseFilmCardToState (filmCard) {
    return Object.assign (
      {},
      filmCard,
      {
        currentEmoji: 'currentEmoji' in filmCard,
        currentTextComment: '',
      },
    );
  }

  static parseStateToFilmCard (filmCard) {
    filmCard = Object.assign({}, filmCard);
    const newComment = generateCommetData();
    newComment.text = filmCard.currentTextComment;
    newComment.emotion = filmCard.currentEmoji;
    filmCard.comments.push(newComment);
    delete filmCard.currentTextComment;
    delete filmCard.currentEmoji;
    return filmCard;
  }
}
