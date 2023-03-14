import {createDatasetPicture} from './data.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content;

const picturesDataset = createDatasetPicture();
const picturesFragment = document.createDocumentFragment();

picturesDataset.forEach((photo) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture').dataset.id = photo.id;
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  picturesFragment.append(pictureElement);
});
picturesListElement.append(picturesFragment);

export {picturesListElement, picturesDataset};
