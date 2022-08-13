// потом вынести в другой файл и импортировать сюда константы
const buttonEditPropile = document.querySelector('.profile__edit-name');
const buttonAddPlace = document.querySelector('.profile__add');
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');

export default class Popup {
  constructor(popupSelector){
    this._element = document.querySelector(popupSelector); // селектор попапа
  }

  // Открыть попап
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  // закрыть попап
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose); // снять слушатель
    this._element.removeEventListener('click', _handleOverlayClose);
  }

  // закрытие попапа клавишей Esc
  _handleEscClose(event) {
    const key = event.code;
    if (key === "Escape") {
      this._element.close();
    }
  }

  // закрытие попапа нажатием на оверлей
  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this._element.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._element.addEventListener('click', _handleOverlayClose);
    buttonEditPropile.addEventListener('click', () => {
        this.open();
      }
    );
    buttonAddPlace.addEventListener('click', () => {
        this.open();
      }
    );
    buttonCloseProfile.addEventListener('click', close);
  }
}