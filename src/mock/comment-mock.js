
import {createId, getRandomText } from '../utils/common.js';
import { getRandomInteger } from '../utils/common.js';
import dayjs from 'dayjs';

const commentId = createId();
const MAX_COMMENT = 5;

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
    get diffmessage () {
      if (this.dateDiff > 2) {
        return this.date.format('YYYY/MM/DD hh:mm');
      }
      if (this.dateDiff <= 2 && this.dateDiff >1 ) {
        return '2 day ago';
      }
      if (this.dateDiff === 1) {
        return'1 day ago';
      }
      return 'today';
    },
  };
};

const generateCommentsListData = () => {
  const items = getRandomInteger(0, MAX_COMMENT);
  const commentsList = [];
  for (let i = 0; i < items; i++) {
    commentsList.push(generateCommetData());
  }
  return commentsList;
};
export {generateCommentsListData, commentId, generateCommetData};
