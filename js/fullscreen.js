import {isEscapeKey} from './util.js';
const COMMENTS_COUNT_DEFAULT = 5;
let shownComments = [];

const bodyElement = document.querySelector('body');
const popupElement = document.querySelector('.big-picture');
const fullscreenPictureElement = document.querySelector('.big-picture__img');
const likesCountElement = document.querySelector('.likes-count');
const commentsCountElement = document.querySelector('.comments-count');
const descriptionPictureElement = document.querySelector('.social__caption');
const commentElement = document.querySelector('.social__comment');
const commentsListElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderElement = document.querySelector('.comments-loader');
const cancelButtonElement = document.querySelector('.big-picture__cancel');

const createComments = (commentsData) => {
  commentsData.forEach(({avatar, message, name}) => {
    const commentClone = commentElement.cloneNode(true);
    commentClone.querySelector('.social__picture').src = avatar;
    commentClone.querySelector('.social__picture').alt = name;
    commentClone.querySelector('.social__text').textContent = message;

    commentsListElement.appendChild(commentClone);
  });
};

const showDefaultCountComments = (comments) => {
  const commentsCountDefault = comments.slice(0, COMMENTS_COUNT_DEFAULT);

  createComments(commentsCountDefault);
  commentCountElement.textContent =
   `${commentsCountDefault.length} из ${comments.length} комментариев`;

  if (commentsCountDefault.length >= comments.length) {
    commentLoaderElement.classList.add('hidden');
  }
};

const showMoreComments = () => {
  const additionalComments = shownComments
    .slice(commentsListElement.children.length, commentsListElement.children.length + 5);
  createComments(additionalComments);
  commentCountElement.textContent =
  `${commentsListElement.children.length} из ${shownComments.length} комментариев`;

  if (shownComments.length <= commentsListElement.children.length) {
    commentLoaderElement.classList.add('hidden');
  }
};

const showFullscreenPicture = (url, likes, comments, description) => {
  openUserModal();

  fullscreenPictureElement.querySelector('img').src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  descriptionPictureElement.textContent = description;

  commentsListElement.innerHTML = '';

  shownComments = comments;
  commentLoaderElement.addEventListener('click', showMoreComments);
  showDefaultCountComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  popupElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  popupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentLoaderElement.classList.remove('hidden');
  commentLoaderElement.removeEventListener('click', showMoreComments);
  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelButtonElement.addEventListener('click', () =>
  closeUserModal()
);

export {showFullscreenPicture};
