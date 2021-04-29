export const FILTER = {
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Watchlist',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
};

export const filtersFunctionMap = {
  [FILTER.ALL_MOVIES]: (filmCards) => filmCards,
  [FILTER.WATCHLIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.userInfo.isWatchList),
  [FILTER.FAVORITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.userInfo.isFavorite),
  [FILTER.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.userInfo.isWatched),
};

export const FilterTypeMatchToFilmsControl = {
  [FILTER.WATCHLIST]: 'isFavorite',
  [FILTER.FAVORITES]: 'isFavorite',
  [FILTER.HISTORY]: 'isWatched',
};
