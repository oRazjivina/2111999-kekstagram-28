import {createPhotoObjects} from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const photoObjectsArray = createPhotoObjects();

const similarDescriptionsFragment = document.createDocumentFragment();

export function renderingObjects() {
  photoObjectsArray.forEach((dataObject) => {
    const photoObject = photoTemplate.cloneNode(true);
    photoObject.querySelector('.picture__img').src = dataObject.url;
    photoObject.querySelector('.picture__comments').textContent = dataObject['comments'].length;
    photoObject.querySelector('.picture__likes').textContent = dataObject.likes;
    similarDescriptionsFragment.append(photoObject);
  });
}

export {photoContainer, similarDescriptionsFragment};
