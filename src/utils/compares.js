import dayjs from 'dayjs';


export const comparerRating = (a, b) => {
  return b.rating - a.rating;
};


export const compareDate = (a, b) => {
  return dayjs().diff(a.dateCreate) - dayjs().diff(b.dateCreate);
};

export const compareComments = (a, b) => {
  return b.comments.length - a.comments.length;
};
