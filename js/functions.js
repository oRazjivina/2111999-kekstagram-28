//Функция для проверки длины строки

const inspectStringLength = (stringValue, maxLength) => String(stringValue).length <= maxLength;
inspectStringLength ('Проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом

const isPalindrom = (stringValue) => {
  const convertedString = stringValue.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = convertedString.length - 1; i >= 0; i--) {
    reverseString += convertedString.at(i);
  }
  return convertedString === reverseString;
};
isPalindrom('Лёша на полке клопа нашёл');


//Функция, которая извлекает из строки число

const extractNumber = (stringValue) => {
  let result = '';
  for (let i = 0; i < stringValue.length; i++) {
    if (!Number.isNaN(parseInt(stringValue.at(i), 10))) {
      result += stringValue.at(i);
    }
  }
  return parseInt(result,10);
};
extractNumber('1 кефир, 0.5 батона');

//Функция, которая добавляет строке символы

const addStringSymbol = (string, minLength, symbol) => {
  while (string.length < minLength) {
    if (symbol.length <= minLength - string.length) {
      string = symbol + string;
    } else {
      const missedSymbol = minLength - string.length;
      string = symbol.slice (0, missedSymbol) + string;
    }
  }
  return string;
};
addStringSymbol('1', 4, '0');
