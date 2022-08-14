// потом вынести в другой файл и импортировать сюда константы
// const buttonClose = document.querySelector('.popup__close');

export default class Popup {
  constructor(popupSelector){
    this._element = document.querySelector(popupSelector); // селектор попапа
    this._buttonClose = this._element.querySelector('.popup__close');
  }

  // Открыть попап
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // закрыть попап
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); // снять слушатель
    this._element.removeEventListener('click', this._handleOverlayClose);
  }

  // закрытие попапа клавишей Esc
  _handleEscClose(event) {
    const key = event.code;
    if (key === "Escape") {
      this.close();
    }
  }

  // закрытие попапа нажатием на оверлей
  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  // добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._element.addEventListener('click', this._handleOverlayClose.bind(this));
/*     buttonEditPropile.addEventListener('click', () => {
        this.open();
      }
    );
    buttonAddPlace.addEventListener('click', () => {
        this.open();
      }
    ); */
    this._buttonClose.addEventListener('click', this.close.bind(this));
  }
}