/* eslint-disable no-unused-vars */
import { getRandomInteger, getRandomFloat } from '../util.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

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
  'the-great-flamarion',
  'the-man-with-the-golden-arm',
  'the-man-with-the-golden-arm 2',
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

const getDescription = () => {
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

const getDuration = () => {
  return dayjs.duration({
    seconds: getRandomInteger(0, 60),
    minutes: getRandomInteger(0,60),
    hours: getRandomInteger(0, 5),
  });
};


const generateFilmInfo = () => {
  const title = TITELS.randomElement();
  const pathToPoster = '../public/images/postets/';
  const pathToBigPoster = pathToPoster;
  const poster = POSTERS.randomElement();
  const duration = getDuration();
  return {
    poster: {
      small: `${pathToPoster}${poster}`,
      big: `${pathToBigPoster}${poster}`,
    },
    title: title,
    originalTitle: `Original: ${title}`,
    director: DIRECTORS.randomElement(),
    screenwriter: WRITERS.shuffle().slice(0, getRandomInteger(0, WRITERS.length - 1)),
    actors: ACTORS.shuffle().slice(0, getRandomInteger(0, ACTORS.length - 1)),
    rating: getRandomFloat(0, 10, 1),
    dateCreate : getDateCreate(),
    filmDuration: {
      hours: duration.get('hours'),
      minutes: duration.get('minutes'),
    },
    genres: GENRES.shuffle().slice(0, getRandomInteger(0, GENRES.length - 1)),
    description: getDescription(),
    comments: {},
    country: COUNTRY.randomElement(),
    adult: ADULT.randomElement(),
  };
};

export { generateFilmInfo };

