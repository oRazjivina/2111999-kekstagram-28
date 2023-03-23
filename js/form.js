import {isEscapeKey} from './util.js';
import {resetValueScale} from './scale.js';
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_MESSAGE = 'Неверно заполнены хэштеги';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const fileFieldElement = document.querySelector('.img-upload__input');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const bodyElement = document.querySelector('body');

const pristine = new Pristine (formElement, {
  classTo: 'img-upload__wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const openForm = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  formElement.reset();
  resetValueScale();
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isFieldFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement;


//если фокус находится в поле ввода, нажатие на Esc не приведёт к закрытию формы.
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

//Проверка хэштегов на максимально допустимое количество
const isValidCountHashtags = (hashtags) =>
  hashtags.length <= HASHTAG_MAX_COUNT;


//Проверка хэштегов на уникальность
const isUniqueHashtags = (hashtags) => {
  const collectionHashtags = hashtags.map((hashtag) =>
    hashtag.toLowerCase());
  return collectionHashtags.length === new Set(collectionHashtags).size;
};

//Проверка хэштегов на валидность содержащих символов
const isValidSymbolHashtags = (hashtag) => HASHTAG_VALID_SYMBOLS.test(hashtag);

const validateHashtags = (value) => {
  const hashtags = value
    .trim() //обрезается лишние пробелы в начале и в конце
    .split(' ') //разделяет хэштеги между собой пробелами
    .filter((hashtag) => hashtag.trim().length); //убирает пустые элементы массива. Оставляет только те хэштеги, которые имеют хоть какую-то длину.
  return isValidCountHashtags(hashtags)
  && isUniqueHashtags(hashtags)
  && hashtags.every(isValidSymbolHashtags);
};

pristine.addValidator (
  hashtagFieldElement,
  validateHashtags,
  HASHTAG_ERROR_MESSAGE
);

const onFileUploadClick = () => {
  openForm();
};

const onCloseButtonClick = () => {
  closeForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileFieldElement.addEventListener('change',onFileUploadClick);
closeButtonElement.addEventListener('click', onCloseButtonClick);
formElement.addEventListener('submit', onFormSubmit);
