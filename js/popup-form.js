import {isEscapeKey} from './util.js';
import {resetValueScale} from './scale.js';
import {resetEffects} from './effect.js';

const bodyElement = document.querySelector('body');
const imgInputElement = document.querySelector('.img-upload__input');
const imgUploadPopupElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');


const isFieldFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closePopupForm();
  }
};

function openPopupForm() {
  imgUploadPopupElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopupForm() {
  formElement.reset();
  resetValueScale();
  resetEffects();
  imgUploadPopupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}


const onFileUploadClick = () => {
  openPopupForm();
};

const onCloseButtonClick = () => {
  closePopupForm();
};


imgInputElement.addEventListener('change', onFileUploadClick);
cancelButtonElement.addEventListener('click', onCloseButtonClick);


export {closePopupForm, onDocumentKeydown};

