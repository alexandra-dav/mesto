import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._handleFormSubmit = submitForm.handleFormSubmit;
    this._formElement = this._element.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  // функция собирает данные всех полей формы
  _getInputValues(){
    this._inputListData = {};
    this._inputList.forEach((inputElement) => {
      this._inputListData[inputElement.popupName] = inputElement.value;
    });
    return this._inputListData;
  }

  // метод должен не только добавлять обработчик клика 
  // иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}