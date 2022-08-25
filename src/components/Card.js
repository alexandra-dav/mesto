export class Card {
    // конструктор класса 
    constructor({ arrey, api, userId, handleCardClick, likeHandleClick, openPopapDeleteThisCard }, selector){
      this._name = arrey.name;
      this._link = arrey.link;
      this._likes = arrey.likes;
      this._count = arrey.likes.length;
      this._cardId = arrey._id;
      this._ownerId = arrey.owner._id;
      this._api = api;
      this._userId = userId;
      this._templateSelector = selector;
      this.handleCardClick = handleCardClick;
      this._likeHandleClick = likeHandleClick;
      this._openPopapDelete = openPopapDeleteThisCard;
    }
  
    // получаем шаблон разметки карточки
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__container')
        .cloneNode(true);
    }
  
    // заполняем шаблон
    createCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector('.elements__image');
      
      this._element.querySelector('.elements__name').textContent = this._name;
      this._image.src = this._link;
      this._image.alt = this._name;

      this._favoriteButton = this._element.querySelector(".elements__favorit");
      this._countLikes = this._element.querySelector(".elements__like-count");
      this._countLikes.textContent = this._count; // изначально показать сколько лайков
      this._deleteButton = this._element.querySelector(".elements__delete");

      // Прячем кнопку удаления карты у карточек, которые мы не создавали
      if (this._ownerId !== this._userId) {
        this._deleteButton.hidden = true;
      }

      this._setEventListeners();
  
      return this._element;
    }
    
    _setEventListeners() {
      this._element.querySelector('.elements__favorit').addEventListener('click', () => {
        this.handleLikeCard();
      });

      this._deleteButton.addEventListener('click', () => {
        this._openPopapDelete();
      });
      this._element.querySelector('.elements__image').addEventListener('click', () => {
        this._imagePhoto();
      });
    }
  
    // Удаление карточки
    removeCard(){
      this._element.remove(); // Метод remove удалит только разметку
      this._element = null; // зануляем объект с данными
    }

  
    // Просмотр фото карточки
    _imagePhoto(){
      this._image.addEventListener("click", () => {
        this.handleCardClick({ 
          name: this._name,
          link: this.link 
        });
      });
    }

    // Отметить или убрать лайк
    handleLikeCard() {
      if(this._favoriteButton.classList.contains('elements__favorit_active')) {
        this._api.deleteLikeCard(this._cardId)
          .then((data) => {
            this._favoriteButton.classList.remove('elements__favorit_active');
            this._countLikes.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        this._api.putLikeCard(this._cardId)
          .then((data) => {
            this._favoriteButton.classList.add('elements__favorit_active');
            this._countLikes.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }