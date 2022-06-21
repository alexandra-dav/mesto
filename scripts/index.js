const popupWProfile = document.querySelector('#edit_profile');
const buttonEditPropile = document.querySelector('.profile__edit-name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupName = popupWProfile.querySelector('.popup__text_form_name');
const popupJob = popupWProfile.querySelector('.popup__text_form_job');
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');
const formElementProfile = popupWProfile.querySelector('form[name="popup-form"]');
// Выберите элементы, куда должны быть вставлены значения полей
const docName = document.querySelector('.profile__name');
const docJob = document.querySelector('.profile__occupation');

const elementsContainer = document.querySelector('.elements');
const plaseTemplate = document.querySelector('#plase-template').content;
const popupWAddElements = document.querySelector('#add_elements');
const buttonAddPlace = document.querySelector('.profile__add');
const buttonCloseAddElements = document.querySelector('.popup__close_window_elements');
const formElementPlace = popupWAddElements.querySelector('form[name="popup-form"]');
// Берем данные из попапа
const placeName = popupWAddElements.querySelector('.popup__text_form_plase');
const placeLink = popupWAddElements.querySelector('.popup__text_form_link');

const popupWPhoto = document.querySelector('#view_photo');
const changeMyName = popupWPhoto.querySelector('.photo__caption');
const changeMyLink = popupWPhoto.querySelector('.photo__image');
const buttonClosePhoto = document.querySelector('.popup__close_window_photo');

/* При загрузке на странице должно быть 6 карточек, 
которые добавит JavaScript.  */
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


// Открыть попап
function openPopup(e) {
  e.classList.add('popup_opened');
}

// Затемнение фона при открытии фото
const openPhoto = (e) => {
  e.classList.add('photo_opened');
}

// Подтягивание значений полей в попап при открытии
function addDataProfile() { 
  popupName.value = profileName.textContent;
  popupJob.value = profileOccupation.textContent;
}

// Закрыть попап
function closePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
}

// Функция добавления-удаления класса у сердечка
const clikOnHeart = (e) => {
  const eventTarget = e.target;
  eventTarget.classList.toggle('elements__favorit_active');
}

// Функция просмотра фото карточки
const viewPhto = (name, link) => {
  changeMyName.textContent = name;
  changeMyLink.src = link;
  changeMyLink.alt = name;
  openPopup(popupWPhoto);
  openPhoto(popupWPhoto); // Тут не дублируются строки openPopup и openPhoto - это разные функции/ Описаны на 59 и 64 строках соответственно
}

// Функция удаления карточки
function removeCard(e) {
  const thisCard = e.target;
  thisCard.closest('.elements__container').remove();
}

// Заполнение карточки 
function createCard(item) {
  const n = item.name;
  const l = item.link;
  const elementContainer = plaseTemplate.querySelector('.elements__container').cloneNode(true);
  
  elementContainer.querySelector('.elements__name').textContent = n;
  const thisContainerLink = elementContainer.querySelector('.elements__image');
  thisContainerLink.src = l;
  thisContainerLink.alt = n;

  const likeBtn = elementContainer.querySelector('.elements__favorit');
  likeBtn.addEventListener('click', clikOnHeart);

  // Удаление карточки
  const deleteBtn = elementContainer.querySelector('.elements__delete');
  deleteBtn.addEventListener('click', removeCard);

  // Просмотр фото карточки
  const chosePhoto = elementContainer.querySelector('.elements__image');
  chosePhoto.addEventListener('click', () => {
    viewPhto(n, l);
  });

  return elementContainer;
}
// Добавление карточки в разметку
function renderCard(item){
  return elementsContainer.prepend(createCard(item));
}

// Создание новой карточки
/* function createElementPlase(name, link) {
  return createCard(name, link);
} */

// Добавление новой карточки
function addElementPlase(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({
    name: placeName.value,
    link: placeLink.value
  });
  placeName.value = '';
  placeLink.value = '';
  closePopup(popupWAddElements);
}

// Изменение данных в профиле
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const jobInput = popupJob.value;
  const nameInput = popupName.value;
  // Вставьте новые значения с помощью textContent
  docName.textContent = nameInput;
  docJob.textContent = jobInput;
  closePopup(popupWProfile);
}

// Создаем дефолтное наполнение
/* for(let i = 0; i < initialCards.length; i++) {
  renderCard(initialCards[i].name, initialCards[i].link);
} */
initialCards.forEach(renderCard);

/* Добавление модификатора при открытии попапа */
buttonEditPropile.addEventListener('click', () => {openPopup(popupWProfile); addDataProfile()});
buttonAddPlace.addEventListener('click', () => {openPopup(popupWAddElements)});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', formSubmitHandler);
formElementPlace.addEventListener('submit', addElementPlase);

/* Удаление модификатора при закрытии попапа различными способами */
buttonCloseProfile.addEventListener('click', () => {closePopup(popupWProfile)});
buttonCloseAddElements.addEventListener('click', () => {closePopup(popupWAddElements)});
buttonClosePhoto.addEventListener('click', () => {closePopup(popupWPhoto)});

/* popupW.addEventListener('click', function(e) {
    if (e.target === e.currentTarget) {
        popupW.classList.remove('popup_opened');
    }
}); */

/* popupW.addEventListener('click', function(e) {
    if (e.target === e.currentTarget) {
        popupW.classList.remove('popup_opened');
    }
}); */

/* document.addEventListener('keydown', function(e){
    if (e.code === "Escape") {
        popupW.classList.remove('popup_opened');
    }
}); */