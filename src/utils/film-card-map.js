export const getCommentsByFilmId = (id, filmCardsMap) => {
  for (const [key, value] of filmCardsMap.entries()) {
    if (key.id === id) {
      return value;
    }
  }
};
