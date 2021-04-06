export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (min, max, point) => {
  return (Math.random() * (max - min) + min).toFixed(point);
};

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

Array.prototype.randomElement = function() {
  return this[getRandomInteger(0, this.length-1)];
};

export const userStatistic = (filmData) => {
  const USER_STATUS = {
    'none': {
      FROM: 0,
      TO: 0,
    },
    'novice': {
      FROM: 1,
      TO: 10,
    },
    'fan': {
      FROM: 11,
      TO: 20,
    },
    'movie buff': {
      FROM: 21,
      TO: 100,
    },
  };
  const getStatus = (number) => {
    const status = [];
    for (const key in USER_STATUS) {
      if (USER_STATUS[key].FROM <= number && number <= USER_STATUS[key].TO) {
        status.push(key);
      }
    }
    return status;
  };
  let favoriteCounter = 0;
  let watchedCounter = 0;
  let watchlistCounter = 0;
  for (let i = 0; i < filmData.length; i++) {
    const {isWatchList,
      isFavorite,
      isWatched,
    } = filmData[i].userInfo;

    if (isFavorite){
      favoriteCounter++;
    }

    if (isWatched) {
      watchedCounter++;
    }

    if (isWatchList) {
      watchlistCounter++;
    }
  }
  return {
    favorits: favoriteCounter,
    watchedFilms: watchedCounter,
    watchlists: watchlistCounter,
    userStatus: getStatus(watchedCounter),
  };
};

