import { generateFilmInfo } from './film-mock.js';
import { generateCommentsData } from './comment-mock.js';

const MAX_FILM_CARD = 20;

const createFilmCardMap = (items) => {
  const filmCardMap = new Map();
  for (let i = 0; i < items; i++) {
    filmCardMap.set(generateFilmInfo(), generateCommentsData());
  }

  return filmCardMap;
};

const filmCardsMap = createFilmCardMap(MAX_FILM_CARD);
export { filmCardsMap };


