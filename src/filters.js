const comparerating = (a, b) => {
  return b.rating - a.rating;
};

export const compareComments = (a, b) => {
  return b.comments.length - a.comments.length;
};

const sortByRating = (map) => {
  const keys =  Array.from(map.keys());
  return keys.sort(comparerating);
};

const sortByComments = (map) => {
  const keys =  Array.from(map.keys());
  return keys.sort(compareComments);
};

export { sortByRating, sortByComments};

