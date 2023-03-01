import {getRandomPositiveInteger, getRandomArrayElements, getUniqueNumberFromRange} from './util.js';

const PHOTO_OBJECTS_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const AVATAR_MIN_COUNT = 1;
const AVATAR_MAX_COUNT = 6;
const ID_MIN_COUNT = 1;
const ID_MAX_COUNT = 25;
const URL_MIN_COUNT = 1;
const URL_MAX_COUNT = 25;
const COMMENTS_ID_MIN_COUNT = 1;
const COMMENTS_ID_MAX_COUNT = 1000;

const NAMES = [
  'Мария', 'Глеб', 'Ярослав', 'Жанна', 'Павел', 'Леонид', 'Дмитрий', 'Юлия', 'Наталья',
  'Анастасия', 'Сергей', 'Анна', 'Юрий', 'Евгений', 'Олег', 'Алексей', 'Максим', 'Татьяна',
  'Светлана', 'Ирина', 'Виктор', 'Андрей', 'Константин', 'Рудольф','Екатерина',
];

const PHOTO_DESCRIPTIONS = [
  'Когда радости нет предела', 'Улыбаюсь новому дню', 'Досадно, но ладно', 'Все люди, как люди, а я суперзвезда!',
  'Релаксирую', 'Законно быть таким фотогеничным?', 'Ночной дожор', 'Кто не работает, тот ест',
  'Просто оставлю это здесь', 'Образ дня', 'Без слов', 'Культурный отдых', 'Остановись мгновение! Ты прекрасно!',
  'Только цель, никаких препятствий', 'Всё в ваших руках', 'Не так страшны корпоративы, как Вас отметили на фото',
  'Как мало нужно для счастья', 'На долгожданном отдыхе', 'Сотрудник года', 'Дома',
  'Обещаю, с понедельника на диете', 'Навстречу новым приключениям', 'Коллекционирую эмоции',
  'Вперёд к новым вершинам', 'И такое случается',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatedComments = () =>
  Array.from({ length: getRandomPositiveInteger (1, 2) }, () =>
    getRandomArrayElements(COMMENTS)
  ).join('.');

const generatedPhotoId = getUniqueNumberFromRange(ID_MIN_COUNT, ID_MAX_COUNT);
const generatedCommentId = getUniqueNumberFromRange(COMMENTS_ID_MIN_COUNT, COMMENTS_ID_MAX_COUNT);
const generatedPhotoUrl = getUniqueNumberFromRange(URL_MIN_COUNT, URL_MAX_COUNT);

// Функция создания фотообъекта

const createPhotoObject = () => ({
  photoId: generatedPhotoId(),
  url: `photos/${generatedPhotoUrl()}.jpg`,
  description: getRandomArrayElements(PHOTO_DESCRIPTIONS),
  likes: getRandomPositiveInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: {
    commentsId: generatedCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(AVATAR_MIN_COUNT, AVATAR_MAX_COUNT)}.svg`,
    message: generatedComments(),
    name: getRandomArrayElements(NAMES),
  }
});

//Функция создания массива из фотообъектов

const createPhotoObjects = () => Array.from({length:PHOTO_OBJECTS_COUNT}, createPhotoObject);

export {createPhotoObjects};
