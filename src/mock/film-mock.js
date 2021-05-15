/* eslint-disable no-unused-vars */
import { getRandomInteger, getRandomFloat } from '../utils/common.js';
import dayjs from 'dayjs';
import { generateCommentsListData } from './comment-mock.js';
import { createId, getRandomText } from '../utils/common.js';
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


const getDateCreate = () => {
  const year = getRandomInteger(0, 60);
  const month = getRandomInteger(0, 12);
  const day = getRandomInteger(0, 31);

  return dayjs()
    .subtract(year, 'year')
    .subtract(month, 'month')
    .subtract(day, 'day');
};


const filmId = createId();

const generateFilmInfo = () => {
  const title = TITELS.randomElement();
  const pathToPoster = '/images/posters/';
  const pathToBigPoster = pathToPoster;
  const poster = POSTERS.randomElement();
  const dateCreate = getDateCreate();
  const commentsList = generateCommentsListData();

  return {
    id: filmId(),
    poster: `${pathToPoster}${poster}`,
    title: title,
    originalTitle: `Original: ${title}`,
    description: getRandomText(),
    director: DIRECTORS.randomElement(),
    screenWriters: WRITERS.shuffle().slice(0, getRandomInteger(0, WRITERS.length - 1)),
    actors: ACTORS.shuffle().slice(0, getRandomInteger(0, ACTORS.length - 1)),
    rating: getRandomFloat(0, 10, 1),
    dateCreate: dateCreate,
    runtime: getRandomInteger(60, 250),
    get runtimeMessage() {
      const hour = Math.trunc(this.runtime / 60);
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
    comments: commentsList,
  };
};

export { generateFilmInfo, getRandomText };

