import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._element.querySelector('.photo__caption');
    this._link = this._element.querySelector('.photo__image');
  }

  open({link, name}){
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;
    super.open();
  }
}