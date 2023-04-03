import {createMessageSuccess, createMessageError} from './util.js';
import {closePopupForm} from './popup-form.js';
import {sendData} from './api.js';
const HASHTAG_MAX_COUNT = 5;
const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_MESSAGE = 'Неверно заполнены хэштеги';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const submitButtonElement = document.querySelector('.img-upload__submit');

const pristine = new Pristine (formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

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
    .trim() //обрезает лишние пробелы в начале и в конце
    .split(' ') //разделяет хэштеги между собой пробелами
    .filter((hashtag) => hashtag.trim().length); //убирает пустые элементы массива. Оставляет только те хэштеги, которые имеют хоть какую-то длину.
  return isValidCountHashtags(hashtags)
  && isUniqueHashtags(hashtags)
  && hashtags.every(isValidSymbolHashtags);
};

pristine.addValidator(
  hashtagFieldElement,
  validateHashtags,
  HASHTAG_ERROR_MESSAGE,
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';

};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';

};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          blockSubmitButton();
          createMessageSuccess();
          bodyElement.classList.add('modal-open');
        },
        () => {
          createMessageError();
          unblockSubmitButton();
          bodyElement.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }
  });
};

setUserFormSubmit(closePopupForm);

export {pristine};
