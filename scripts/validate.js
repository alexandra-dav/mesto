
const showInputError = (formElement, inputElement, errorMessage, item) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${item.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${item.errorClass}`);
  };
  
  const hideInputError = (formElement, inputElement, item) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${item.inputErrorClass}`);
    errorElement.classList.remove(`${item.errorClass}`);
    errorElement.textContent = '';
  };

// Проверка инпутов при вводе
const checkInputValidity = (formElement, inputElement, item) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, item);
  } else {
    hideInputError(formElement, inputElement, item);
  }
};

// Проверка валидности формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// Переключатель классов: зависит от тог валидна ли форма
const toggleButtonState = (inputList, buttonElement, item) => { //Первый — массив полей, второй — кнопка «Далее».
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${item.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${item.inactiveButtonClass}`);
  }
};

const enableValidation = (item) => {
  const formList = Array.from(document.querySelectorAll(`${item.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    });
    const inputList = Array.from(formElement.querySelectorAll(`${item.inputSelector}`)); // находим все инпуты
    const buttonElement = formElement.querySelector(`${item.submitButtonSelector}`); // находим кнопку
    toggleButtonState(inputList, buttonElement, item); // проверяем изначально форма валидна?
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, item);
        toggleButtonState(inputList, buttonElement, item);
      });
    });
  });
};


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});