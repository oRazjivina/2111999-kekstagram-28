import {updatesArray} from './util.js';
import {renderSimilarPicture} from './miniature.js';

const RANDOM_PICTURES_COUNT = 10;
const RERENDER_DELAY = 500; //при переключении фильтра обновление списка не чаще, чем один раз в полсекунды

const filterButtonsElements = document.querySelectorAll('.img-filters__button');

const makeButtonActive = (evt) => {
  filterButtonsElements.forEach((option) => {
    if (evt.target.classList.contains('img-filters__button')) {
      option.classList.remove('img-filters__button--active');
    }
  });
  if (evt.target.classList.contains('img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }
};

const switchPictureFilter = (posts, evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelectorAll('.picture').forEach((pictures) => {
      pictures.remove(); // при переключении фильтра очищаем отрисованные ранее фото
    });
  }
  let picturesList = posts;
  switch (evt.target.id) {
    case 'filter-default': //кейс для фото По умолчанию
      renderSimilarPicture(picturesList);
      break;
    case 'filter-random': //кейс для фото Случайные
      picturesList = updatesArray(posts).slice(0, RANDOM_PICTURES_COUNT);
      renderSimilarPicture(picturesList);
      break;
    case 'filter-discussed': //кейс для фото Обсуждаемые
      picturesList = posts
        .slice()
        .sort((a, b) => {
          if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return -1;
          }
        });
      renderSimilarPicture(picturesList);
      break;
  }
};

export {makeButtonActive, switchPictureFilter, RERENDER_DELAY};
