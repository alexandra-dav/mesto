export class Card {
    // конструктор класса 
    constructor({ arrey, userId, handleCardClick, likeHandleClick, openPopapDeleteThisCard }, selector){
      this.data = arrey;
      this._name = this.data.name;
      this._link = this.data.link;
      this._likes = this.data.likes;
      this._count = this.data.likes.length;
      this._cardId = this.data._id;
      this._ownerId = this.data.owner._id;
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
      this._updateLikesView();
      //this._favoriteButton.classList.toggle('elements__favorit_active', this.isLiked());
      //this._countLikes.textContent = this._count; // изначально показать сколько лайков
      this._deleteButton = this._element.querySelector(".elements__delete");

      this.isLike = this.isLiked();

      // Прячем кнопку удаления карты у карточек, которые мы не создавали
      if (this._ownerId !== this._userId) {
        this._deleteButton.hidden = true;
      }

      this._setEventListeners();
  
      return this._element;
    }
    
    isLiked() {
      return this._likes.some((like) => like._id === this._userId);
    }

    _setEventListeners() {
      this._favoriteButton.addEventListener('click', () => {
        this._likeHandleClick(this.isLike, this._cardId, (data) => {
          this.updateLikes(data);
          this.isLike = this.isLiked();
        });
      });

      this._deleteButton.addEventListener('click', () => {
        this._openPopapDelete(this, this._cardId);
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


    // метод для обновления всей информации о лайках, состояние и количество
    _updateLikesView() {
      this._count = this._likes.length;
      this._countLikes.textContent = this._count;
      this._favoriteButton.classList.toggle('elements__favorit_active', this.isLiked());
    } 

    // пересчет лайков
    updateLikes(newDataAboutLikes) {
      this._likes = newDataAboutLikes;
      this._updateLikesView();
    }
  }