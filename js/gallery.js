import {createDatasetPictures} from './data.js';
import {createMiniature} from './miniature.js';
import {openBigPicture, closeBigPicture} from './fullscreen.js';

const pictureContainerElement = document.querySelector('.pictures');
const closeButtonElement = document.querySelector('.big-picture__cancel');

const pictures = createDatasetPictures();
createMiniature(pictures);

pictureContainerElement.addEventListener ('click', (evt) => {
  const picture = evt.target.closest('.picture');
  if (picture) {
    const currentPicture = pictures.find((item) => item.id === Number(picture.dataset.id));
    openBigPicture(currentPicture);
  }
});

closeButtonElement.addEventListener('click', () =>{
  closeBigPicture();
});
