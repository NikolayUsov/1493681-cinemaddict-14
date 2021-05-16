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
  const statuses = [];
  for (const key in USER_STATUS) {
    if (USER_STATUS[key].FROM <= number && number <= USER_STATUS[key].TO) {
      statuses.push(key);
    }
  }

  return statuses;
};

export { getStatus };
