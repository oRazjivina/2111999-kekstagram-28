const NAMES = [
  'Мария', 'Глеб', 'Ярослав', 'Жанна', 'Павел', 'Леонид', 'Дмитрий', 'Юлия', 'Наталья',
  'Анастасия', 'Сергей', 'Анна', 'Юрий', 'Евгений', 'Олег', 'Алексей', 'Максим', 'Татьяна',
  'Светлана', 'Ирина', 'Виктор', 'Андрей', 'Константин', 'Рудольф','Екатерина',
];

const PHOTO_DESCRIPTION = [
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

const PHOTO_OBJECTS_QUANTITY = 25;

//Функция возвращает случайное целое положительное число

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция возвращает случайный элемент массива

const getRandomArrayElements = (elements) => elements [getRandomPositiveInteger(0, elements.length - 1)];


// Функция для генерации уникального (неповторяющегося) числа из указанного дипазона
const getUniqueNumberFromRange = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length > (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatedPhotoId = getUniqueNumberFromRange(1, 25);
const generatedCommentId = getUniqueNumberFromRange(1, 1000);
const generatedPhotoUrl = getUniqueNumberFromRange(1, 25);

const createPhotoObject = () => ({
  photoId: generatedPhotoId(),
  url: `photos/${generatedPhotoUrl()}.jpg`,
  description: getRandomArrayElements(PHOTO_DESCRIPTION),
  likes: getRandomPositiveInteger(15, 200),
  comments: {
    commentsId: generatedCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElements(MESSAGES),
    name: getRandomArrayElements(NAMES),
  }
});

// eslint-disable-next-line no-unused-vars
const PhotoObjects = Array.from({length:PHOTO_OBJECTS_QUANTITY}, createPhotoObject);


