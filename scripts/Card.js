import {popupWPhoto, changeMyName, changeMyLink, openPopup} from './index.js';
export class Card {
    // конструктор класса 
    constructor(arrey, selector){
      this._name = arrey.name;
      this._link = arrey.link;
      this._templateSelector = selector;
    }
  
    // получаем шаблон разметки карточки
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__container')
      .cloneNode(true);
  
      return cardElement;
    }
  
    // заполняем шаблон
    createCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector('.elements__image');
      
      this._element.querySelector('.elements__name').textContent = this._name;
      this._image.src = this._link;
      this._image.alt = this._name;
      this._setEventListeners();
  
      return this._element;
    }
    
    _setEventListeners() {
      this._element.querySelector('.elements__favorit').addEventListener('click', () => {
        this._clikOnHeart();
      });
      this._element.querySelector('.elements__delete').addEventListener('click', () => {
        this._removeCard();
      });
      this._element.querySelector('.elements__image').addEventListener('click', () => {
        this._viewPhoto();
      });
    }
    
    // Отметить или убрать лайк
    _clikOnHeart = () => {
      this._element.querySelector('.elements__favorit').classList.toggle('elements__favorit_active');
    }
  
    // Удаление карточки
    _removeCard(){
      this._element.remove(); // Метод remove удалит только разметку
      this._element = null; // зануляем объект с данными
    }
  
    // Просмотр фото карточки
    _viewPhoto(){
      changeMyName.textContent = this._name;
      changeMyLink.src = this._link;
      changeMyLink.alt = this._name;
      openPopup(popupWPhoto);
    }
  }