const SCALE_STEP = 25;
const MAX_VALUE_SCALE = 100;
const MIN_VALUE_SCALE = 25;
const DEFAULT_VALUE_SCALE = 100;

const buttonSmallerElement = document.querySelector('.scale__control--smaller');
const buttonBiggerElement = document.querySelector('.scale__control--bigger');
const controlValueElement = document.querySelector('.scale__control--value');
const pictureElement = document.querySelector('.img-upload__preview img');

const changeScalePicture = (value) => {
  pictureElement.style.transform = `scale(${value / 100})`; //применяем стиль transform(scale)
  controlValueElement.value = `${value}%`;
};

const onButtonSmallerClick = () => {
  const currentValue = parseInt(controlValueElement.value, 10);
  let newValue = currentValue - SCALE_STEP; //значение пользователя, как разность между текущим - шаг

  if (newValue < MIN_VALUE_SCALE) {
    newValue = MIN_VALUE_SCALE; //если значение пользователя меньше минимальновозможного, то допустимой нижней границей будет минимально возможное
  }
  changeScalePicture(newValue);
};

const onButtonBiggerClick = () => {
  const currentValue = parseInt(controlValueElement.value, 10);
  let newValue = currentValue + SCALE_STEP; //значение пользователя, как сумма текущего и шага

  if (newValue > MAX_VALUE_SCALE) {
    newValue = MAX_VALUE_SCALE; //если значение пользователя больше максимальнодопустимого, то допустимой верхней границей будет максимально возможное
  }
  changeScalePicture(newValue);
};

const resetValueScale = () => changeScalePicture(DEFAULT_VALUE_SCALE); //сброс до дефолтного значения

buttonSmallerElement.addEventListener('click', onButtonSmallerClick);
buttonBiggerElement.addEventListener('click', onButtonBiggerClick);

export {resetValueScale};
