import {getRandomPositiveInteger, getRandomArrayElements, getUniqueNumberFromRange} from './util.js';

const PHOTO_OBJECTS_COUNT = 25;
const PHOTO_LIKES_MIN_COUNT = 15;
const PHOTO_LIKES_MAX_COUNT = 200;
const AVATAR_URL_MIN_COUNT = 1;
const AVATAR_URL_MAX_COUNT = 6;
const PHOTO_ID_MIN_COUNT = 1;
const PHOTO_ID_MAX_COUNT = 25;
const PHOTO_URL_MIN_COUNT = 1;
const PHOTO_URL_MAX_COUNT = 25;
const COMMENT_ID_MIN = 1;
const COMMENT_ID_MAX = 1000;
const COMMENTS_MIN_COUNT = 1;
const COMMENTS_MAX_COUNT = 20;

const NAMES = [
  'Мария', 'Глеб', 'Ярослав', 'Жанна', 'Павел', 'Леонид', 'Дмитрий', 'Юлия', 'Наталья',
  'Анастасия', 'Сергей', 'Анна', 'Юрий', 'Евгений', 'Олег', 'Алексей', 'Максим', 'Татьяна',
  'Светлана', 'Ирина', 'Виктор', 'Андрей', 'Константин', 'Рудольф','Екатерина',
];

const DESCRIPTIONS = [
  'Когда радости нет предела', 'Улыбаюсь новому дню', 'Досадно, но ладно', 'Все люди, как люди, а я суперзвезда!',
  'Релаксирую', 'Законно быть таким фотогеничным?', 'Ночной дожор', 'Кто не работает, тот ест',
  'Просто оставлю это здесь', 'Образ дня', 'Без слов', 'Культурный отдых', 'Остановись мгновение! Ты прекрасно!',
  'Только цель, никаких препятствий', 'Всё в ваших руках', 'Не так страшны корпоративы, как Вас отметили на фото',
  'Как мало нужно для счастья', 'На долгожданном отдыхе', 'Сотрудник года', 'Дома',
  'Обещаю, с понедельника на диете', 'Навстречу новым приключениям', 'Коллекционирую эмоции',
  'Вперёд к новым вершинам', 'И такое случается',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatedPhotoId = getUniqueNumberFromRange(PHOTO_ID_MIN_COUNT, PHOTO_ID_MAX_COUNT);
const generatedCommentId = getUniqueNumberFromRange(COMMENT_ID_MIN, COMMENT_ID_MAX);
const generatedPhotoUrl = getUniqueNumberFromRange(PHOTO_URL_MIN_COUNT, PHOTO_URL_MAX_COUNT);

const createComment = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: generatedCommentId(),
      avatar: `img/avatar-${getRandomPositiveInteger(AVATAR_URL_MIN_COUNT, AVATAR_URL_MAX_COUNT)}.svg`,
      message: getRandomArrayElements(MESSAGES),
      name: getRandomArrayElements(NAMES),
    });
  }
  return comments;
};


const createDataPicture = () => ({
  id: generatedPhotoId(),
  url: `photos/${generatedPhotoUrl()}.jpg`,
  description: getRandomArrayElements(DESCRIPTIONS),
  likes: getRandomPositiveInteger(PHOTO_LIKES_MIN_COUNT, PHOTO_LIKES_MAX_COUNT),
  comments: createComment(getRandomPositiveInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT)),
});


export const createDatasetPictures = () => Array.from({length:PHOTO_OBJECTS_COUNT}, createDataPicture);


