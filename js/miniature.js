import {showFullscreenPicture} from './fullscreen.js';
import {getData} from './api.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

export const renderSimilarPicture = (pictures) => {
  pictures.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    picturesFragment.append(pictureElement);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFullscreenPicture(url, likes, comments, description);
    });
    picturesFragment.append(pictureElement);
  });
  picturesListElement.append(picturesFragment);
};

getData((posts) => {
  renderSimilarPicture(posts);
});
