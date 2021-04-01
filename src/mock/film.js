/* eslint-disable no-unused-vars */
import { getRandomInteger } from '../util.js';

const getTitle = () => {
  const titles = [
    'made for each other',
    'popeye meets sinbad',
    'the-great-flamarion',
    'the-man-with-the-golden-arm',
    'the-man-with-the-golden-arm 2',
  ];

  return titles[getRandomInteger(0, titles.length-1)];
};

const getDescription = () => {
  const phrase = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  return phrase.split('.').shuffle().slice(0, getRandomInteger(1,5)).join('.');
};


const generateFilmInfo = () => {
  return {
    poster: {
      small: '',
      big: '',
    },
    title: getTitle(),
    originalTitle: `Original ${getTitle()}`,
    director:'',
    screenwriter: [],
    actors: [],
    rating: 8.9,
    dateCreate : '',
    duration: '1h-min',
    genres: [],
    description: getDescription(),
    comments: {},
    country: '',
    adult: '',
  };
};


