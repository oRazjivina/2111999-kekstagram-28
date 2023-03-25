//Массив из объектов (эффектов)
const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0]; //Дефолтный эффект - первый элемент массива (Оригинал)

const pictureElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

//Показывает слайдер
const openSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

//Прячет слайдер
const closeSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

let selectedEffect = DEFAULT_EFFECT; //Актуальный на данный момент эффект(значение которого будет изменяться)

const isDefaultValue = () => selectedEffect === DEFAULT_EFFECT; //в зависимости от результата возвращает true или false


const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({ //передаём настройки выбранного пользователем эффекта
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.max,
  });
  if (isDefaultValue()) { //проверяем если выбран эффект по умолчанию
    closeSlider(); // закрываем слайдер
  } else {
    openSlider(); // в ином случае - показываем слайдер
  }
};

//Обработчик, отвечающий за смену эффекта
const onEffectClick = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) { //проверяем, если клик произошел не на фильтре,
    return; //то к следующему шагу не переходим
  }
  //Перебираем массив и ищем в нём тот объект, у которого name равен значению value выбранного эффекта
  selectedEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  pictureElement.className = `effects__preview--${selectedEffect.name}`; //добавляем класс, соответствующий эффекту
  updateSlider();
};

//
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get(); // получаем значение слайдера
  pictureElement.style.filter = isDefaultValue() //проверяем что выбран дефолтный эффект
    ? DEFAULT_EFFECT.style //если эффект дефолтный - записываем стиль дефолтного
    : `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`; // в ином случае в стиль передаём стиль актуального эффекта, значение слайдера, единицу измерения.
  effectLevelElement.value = sliderValue; //записываем значение слайдера в скрытое поле
};

//сбрасываем все заданные значения до дефолтных
export const resetEffects = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

//Создаём слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
closeSlider();

effectsElement.addEventListener('change', onEffectClick);
sliderElement.noUiSlider.on('update', onSliderUpdate);

