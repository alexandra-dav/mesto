export class FormValidator {
  constructor(validateObject, formElement){ // список с классами ошибкок, валидируемая форма
    this._validateObject = validateObject;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validateObject.submitButtonSelector); // находим кнопку
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validateObject.inputSelector)); // находим все инпуты
  }

  // включает валидацию формы
  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const _setElement = this;
    _setElement._toggleButtonState();
    _setElement._inputList.forEach(function (inputElement) {
      inputElement.addEventListener("input", () => {
        _setElement._checkInputValidity(inputElement);
        _setElement._toggleButtonState();
      });
    });
  }
  // Проверка инпутов при вводе
  _checkInputValidity(inputElement) {
    !inputElement.validity.valid 
      ? this._showInputError(inputElement, inputElement.validationMessage)
      : this._hideInputError(inputElement);
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._validateObject.inputErrorClass}`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(`${this._validateObject.errorClass}`);
  }

  _hideInputError(inputElement){
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._validateObject.inputErrorClass}`);
    this._errorElement.classList.remove(`${this._validateObject.errorClass}`);
    this._errorElement.textContent = '';
  }
  // Переключатель классов: зависит от того валидна ли форма
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'disabled');
      this._buttonElement.classList.add(`${this._validateObject.inactiveButtonClass}`);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(`${this._validateObject.inactiveButtonClass}`);
    }
  }
  // Проверка валидности формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }
}