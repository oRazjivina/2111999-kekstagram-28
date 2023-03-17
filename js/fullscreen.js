import {picturesListElement, picturesDataset} from './miniature.js';
import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = document.querySelector('.big-picture__img');
const bigPictureLikesElement = document.querySelector('.likes-count');
const bigPictureCommentsCountElement = document.querySelector('.comments-count');
const bigPictureDescriptionElement = document.querySelector('.social__caption');
const commentTemplateElement = document.querySelector('.social__comment');
const commentsListElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderElement = document.querySelector('.comments-loader');
const closeButtonElement = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onPictureClick (evt) {
  if(evt.target.matches('.picture__img')) {
    evt.preventDefault();
    openBigPicture();
    commentsListElement.innerHTML = '';

    picturesDataset.forEach((photo) => {
      if (photo.id.toString() === evt.target.closest('.picture').dataset.id) {

        photo.comments.forEach((comment) => {
          const commentElement = commentTemplateElement.cloneNode(true);

          commentElement.querySelector('.social__picture').src = comment.avatar;
          commentElement.querySelector('.social__picture').alt = comment.name;
          commentElement.querySelector('.social__text').textContent = comment.message;

          commentsListElement.append(commentElement);
        });

        bigPictureDescriptionElement.textContent = photo.description;
      }
    });

    commentCountElement.classList.add('hidden');
    commentLoaderElement.classList.add('hidden');

    bigPictureImgElement.querySelector('img').src = evt.target.src;
    bigPictureImgElement.querySelector('img').alt = evt.target.alt;
    bigPictureLikesElement.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
    bigPictureCommentsCountElement.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

    closeButtonElement.addEventListener('click', closeBigPicture);
  }
}

picturesListElement.addEventListener('click', onPictureClick);
