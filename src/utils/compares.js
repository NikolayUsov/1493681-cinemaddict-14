import dayjs from 'dayjs';


export const compareRaiting = (a, b) => {
  return b.rating - a.rating;
};


export const compareDate = (a, b) => {
  return dayjs().diff(a.dateCreate) -  dayjs().diff(b.dateCreate);
};

