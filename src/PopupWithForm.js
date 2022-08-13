// потом вынести в другой файл и импортировать сюда константы
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');

import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm; // функиця колбэк сабмита формы
    this._inputList = Array.from(super._element.querySelectorAll('popup__input'.inputSelector)); // находим все инпуты
  }

  // функция собирает данные всех полей формы
  _getInputValues(){
    this._firstInput = _inputList[0];
    this._secondInput = _inputList[1];
  }

  // метод должен не только добавлять обработчик клика 
  // иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}