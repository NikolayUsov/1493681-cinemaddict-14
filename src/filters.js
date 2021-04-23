const compareRaiting = (a, b) => {
  return b.rating - a.rating;
};

const compareComments = (a, b) => {
  return b.comments.length - a.comments.length;
};

const sortByRaiting = (map) => {
  const keys =  Array.from(map.keys());
  return keys.sort(compareRaiting);
};

const sortByComments = (map) => {
  const keys =  Array.from(map.keys());
  return keys.sort(compareComments);
};

export { sortByRaiting, sortByComments};

