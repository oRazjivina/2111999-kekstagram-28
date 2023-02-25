const NAMES = [
  'Мария', 'Глеб', 'Ярослав', 'Жанна', 'Павел', 'Леонид', 'Дмитрий', 'Юлия', 'Наталья',
  'Анастасия', 'Сергей', 'Анна', 'Юрий', 'Евгений', 'Олег', 'Алексей', 'Максим', 'Татьяна',
  'Светлана', 'Ирина', 'Виктор', 'Андрей', 'Константин', 'Рудольф','Екатерина'
];

const PHOTO_DESCRIPTION = [
  'Когда радости нет предела', 'Улыбаюсь новому дню', 'Досадно, но ладно', 'Все люди, как люди, а я суперзвезда!',
  'Релаксирую', 'Законно быть таким фотогеничным?', 'Ночной дожор', 'Кто не работает, тот ест',
  'Просто оставлю это здесь', 'Образ дня', 'Без слов', 'Культурный отдых', 'Остановись мгновение! Ты прекрасно!',
  'Только цель, никаких препятствий', 'Всё в ваших руках', 'Не так страшны корпоративы, как Вас отметили на фото',
  'Как мало нужно для счастья', 'На долгожданном отдыхе', 'Сотрудник года', 'Дома',
  'Обещаю, с понедельника на диете', 'Навстречу новым приключениям', 'Коллекционирую эмоции',
  'Вперёд к новым вершинам', 'И такое случается'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomId = (min, max) => {
  const previousId = [];
  return function () {
    let currentId = getRandomInteger(min, max);
    if (previousId.length > (max - min + 1)) {
      return null;
    }
    while (previousId.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    previousId.push(currentId);
    return currentId;
  };
};

const photoId = getRandomId (1, 25);
const generatedCommentId = getRandomId(1, 100);

const getRandomUrl = (min, max) => {
  const previousUrl = [];
  return function () {
    let currentUrl = getRandomInteger(min, max);
    if (previousUrl.length >= (max - min + 1)) {
      return null;
    }
    while (previousUrl.includes(currentUrl)) {
      currentUrl = getRandomInteger(min, max);
    }
    previousUrl.push(currentUrl);
    return currentUrl;
  };
};

function commentsGenerator () {
  return {
    id: generatedCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: `${COMMENTS[getRandomInteger(0, COMMENTS.length - 1)]}`,
    name: `${NAMES[getRandomInteger(0, NAMES.length - 1)]}`
  };
}
