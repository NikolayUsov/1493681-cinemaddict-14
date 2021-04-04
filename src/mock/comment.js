
import {createId, getRandomText} from './film.js';
import { getRandomInteger } from '../util.js';
import dayjs from 'dayjs';

const commentId = createId();


const EMODJI =  ['smile', 'sleeping', 'puke', 'angry'];
const COMMENT_AUTHOR  =['Makim', 'ivan', 'Petr','sveta', 'Vadim'];

const generateCommetData = () => {
  const dataComment = dayjs().subtract(getRandomInteger(0,5), 'day');
  return {
    id: commentId(),
    author: COMMENT_AUTHOR.randomElement(),
    text: getRandomText(),
    date: dataComment,
    dateDiff: dayjs().diff(dataComment, 'day'),
    emotion: EMODJI.randomElement(),
  };
};

const generateCommentsListData = (items) => {
  const commentsList = [];
  for (let i = 0; i < items; i++) {
    commentsList.push(generateCommetData());
  }
  return commentsList;
};

export {generateCommentsListData};
