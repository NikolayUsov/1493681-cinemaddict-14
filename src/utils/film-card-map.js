import { filmCardsMap } from '../mock/data.js';

export const getCommentsByFilmIdInMap = (id, filmCardsMap) => {
  for (const [key, value] of filmCardsMap.entries()) {
    if (key.id === id) {
      return value;
    }
  }
};

export const getCommentsByFilmId = (dataMap) => {
  return (id) => {
    return getCommentsByFilmIdInMap(id, dataMap);
  };
};

export const getComments = getCommentsByFilmId(filmCardsMap);

