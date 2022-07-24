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
      
      this._element.querySelector('.elements__name').textContent = this._name;
      this._element.querySelector('.elements__image').src = this._link;
      this._element.querySelector('.elements__image').alt = this._name;
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
        this._viewPhto();
      });
    }
    
    // Отметить или убрать лайк
    _clikOnHeart = () => {
      this._element.querySelector('.elements__favorit').classList.toggle('elements__favorit_active');
    }
  
    // Удаление карточки
    _removeCard(){
      this._element.querySelector('.elements__delete').closest('.elements__container').remove();
    }
  
    // Просмотр фото карточки
    _viewPhto(){
      changeMyName.textContent = this._name;
      changeMyLink.src = this._link;
      changeMyLink.alt = this._name;
      openPopup(popupWPhoto);
    };
  }