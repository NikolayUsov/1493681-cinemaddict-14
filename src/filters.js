const compareRaiting = (a, b) => {
  return b.rating - a.rating;
};

const compareComments = (a, b) => {
  return b[1].length - a[1].length;
};

const sortByRaiting = (map) => {
  const keys =  Array.from(map.keys());
  return keys.sort(compareRaiting);
};

const sortByComments = (map) => {
  const sortMap = new Map([...map].sort(compareComments));
  return Array.from(sortMap.keys());
};

export { sortByRaiting, sortByComments};

