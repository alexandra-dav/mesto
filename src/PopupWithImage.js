import Popup from "./Popup.js";
import { changeMyName, changeMyLink } from "./index.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open(){
    this._element.classList.add('popup_opened');
    changeMyName.textContent = this._name;
    changeMyLink.src = this._link;
    changeMyLink.alt = this._name;
  }
}

/* Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап 
картинку с src изображения и подписью к картинке. */