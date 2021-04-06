/* eslint-disable no-unused-vars */
import { getRandomInteger, getRandomFloat } from '../util.js';
import dayjs from 'dayjs';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const TITELS = [
  'made for each other',
  'popeye meets sinbad',
  'the great flamarion',
  'the man with the golden arm',
  'the man with the golden arm 2',
];

const DIRECTORS = [
  'Boris Cat',
  'Slava js',
  'Nolan',
  'Big Black Milk',
  'Pieer Woodman',
];

const WRITERS = [
  'Royling',
  'Stone Smith',
  'American Boy',
  'Oryel',
  'Ben Foster',
];

const ACTORS = [
  'Will Terner',
  'Benedict',
  'Sara Connor',
  'Woooooooood Daymon',
  'Sarik Chachran',
  'Step Mom',
  'Lexa Tyan',
];

const GENRES = [
  'sport',
  'Music',
  'documental',
  'Fantastic',
];

const COUNTRY = [
  'Russia',
  'USA',
  'France',
  'England',
];

const ADULT = [
  '6+',
  '12+',
  '16+',
  '18+',
];

const getRandomText = () => {
  const phrase = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  return phrase.split('.').shuffle().slice(0, getRandomInteger(1,5)).join('.');
};

const getDateCreate = () => {
  const year = getRandomInteger(0, 60);
  const month = getRandomInteger(0, 12);
  const day = getRandomInteger(0, 31);

  return dayjs()
    .subtract(year, 'year')
    .subtract(month, 'month')
    .subtract(day,'day');
};

const createId = ()=> {
  let id = 0;
  return () => {
    id++;
    return id;
  };
};
const filmId = createId();

const generateFilmInfo = () => {
  const title = TITELS.randomElement();
  const pathToPoster = '/images/posters/';
  const pathToBigPoster = pathToPoster;
  const poster = POSTERS.randomElement();

  return {
    id:filmId(),
    poster: `${pathToPoster}${poster}`,
    title: title,
    originalTitle: `Original: ${title}`,
    description: getRandomText(),
    director: DIRECTORS.randomElement(),
    screenWriters: WRITERS.shuffle().slice(0, getRandomInteger(0, WRITERS.length - 1)),
    actors: ACTORS.shuffle().slice(0, getRandomInteger(0, ACTORS.length - 1)),
    rating: getRandomFloat(0, 10, 1),
    dateCreate : getDateCreate(),
    runtime: getRandomInteger(60, 250),
    get runtimeMessage () {
      const hour = Math.trunc(this.runtime/60);
      const minutes = this.runtime % 60;
      return `${hour > 0 ? `${hour}h` : ''} ${minutes > 0 ? `${minutes}m` : ''}`;
    },
    genres: GENRES.shuffle().slice(0, getRandomInteger(0, GENRES.length - 1)),
    country: COUNTRY.randomElement(),
    adult: ADULT.randomElement(),
    userInfo: {
      isWatchList: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
    },
  };
};

export { generateFilmInfo, createId, getRandomText};

