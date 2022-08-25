import Popup from "./Popup.js";

export class PopupConfirmation extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._formElement = this._element.querySelector('.popup__form');
    //this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
    });
  }
}