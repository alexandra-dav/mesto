import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {  // popup_photo, photo__image, photo__caption
    super(popupSelector);
    this._name = this._element.querySelector('.photo__caption');
    this._link = this._element.querySelector('.photo__image');
  }

  open(data){ // (data -> data.name, data.link)
    this._link.src = data.link;
    this._link.alt = data.link;
    this._name.textContent = data.name;
    super.open();
  }
}

/* Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап 
картинку с src изображения и подписью к картинке. */