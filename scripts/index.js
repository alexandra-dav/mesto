const popupWProfile = document.querySelector('#edit_profile');
const buttonEditPropile = document.querySelector('.profile__edit-name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupFormProfile = document.forms.popupFormProfile;
// Выберите элементы, куда должны быть вставлены значения полей
const popupName = popupFormProfile.elements.popupName;
const popupJob = popupFormProfile.elements.popupJob;
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');

const elementsContainer = document.querySelector('.elements');
const plaseTemplate = document.querySelector('#plase-template').content;
const popupWAddElements = document.querySelector('#add_elements');
const buttonAddPlace = document.querySelector('.profile__add');
const buttonCloseAddElements = popupWAddElements.querySelector('.popup__close_window_elements');
const popupFormElements = document.forms.popupFormElements;
// Берем данные из попапа
const placeName = popupFormElements.elements.popupPlase;
const placeLink = popupFormElements.elements.popupLink;

const popupWPhoto = document.querySelector('#view_photo');
const changeMyName = popupWPhoto.querySelector('.photo__caption');
const changeMyLink = popupWPhoto.querySelector('.photo__image');
const buttonClosePhoto = popupWPhoto.querySelector('.popup__close_window_photo');

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
};

// Подтягивание значений полей в попап при открытии
function addDataProfile() {
  popupName.value = profileName.textContent;
  popupJob.value = profileOccupation.textContent;
};

// Закрыть попап
function closePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
};

//Закрыть попап на нажатию Escape
const clickEscape = (e) => {
  const key = e.code;  
  if (key === "Escape") {
    // Искать открытый попап
    const closeThis = document.querySelector('.popup_opened');
    closePopup(closeThis);
    e.target.removeEventListener('keydown', clickEscape); // снять слушатель
  }
};

document.addEventListener('keydown', clickEscape);

// Закрытие попапа кликом на оверлей
const clickOverlay = function(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
    event.target.removeEventListener('click', clickOverlay); // снять слушатель
  }
};

// Функция добавления-удаления класса у сердечка
const clikOnHeart = (e) => {
  const eventTarget = e.target;
  eventTarget.classList.toggle('elements__favorit_active');
};

// Функция просмотра фото карточки
const viewPhto = (name, link) => {
  changeMyName.textContent = name;
  changeMyLink.src = link;
  changeMyLink.alt = name;
  openPopup(popupWPhoto);
};

// Функция удаления карточки
function removeCard(e) {
  const thisCard = e.target;
  thisCard.closest('.elements__container').remove();
};

// Заполнение карточки 
function createCard(item) {
  const elementContainer = plaseTemplate.querySelector('.elements__container').cloneNode(true);
  
  elementContainer.querySelector('.elements__name').textContent = item.name;
  const thisContainerLink = elementContainer.querySelector('.elements__image');
  thisContainerLink.src = item.link;
  thisContainerLink.alt = item.name;

  const likeBtn = elementContainer.querySelector('.elements__favorit');
  likeBtn.addEventListener('click', clikOnHeart);

  // Удаление карточки
  const deleteBtn = elementContainer.querySelector('.elements__delete');
  deleteBtn.addEventListener('click', removeCard);

  // Просмотр фото карточки
  const chosePhoto = elementContainer.querySelector('.elements__image');
  chosePhoto.addEventListener('click', () => {
    viewPhto(item.name, item.link);
  });

  return elementContainer;
};
// Добавление карточки в разметку
function renderCard(item){
  elementsContainer.prepend(createCard(item));
};

// Добавление новой карточки
function addElementPlase(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({
    name: placeName.value,
    link: placeLink.value
  });
  popupFormElements.reset();
  closePopup(popupWAddElements);
};

// Изменение данных в профиле
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const jobInput = popupJob.value;
  const nameInput = popupName.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput;
  profileOccupation.textContent = jobInput;
  closePopup(popupWProfile);
};

initialCards.forEach(renderCard);

/* Добавление модификатора при открытии попапа */
buttonEditPropile.addEventListener('click', () => {openPopup(popupWProfile); addDataProfile()});
buttonAddPlace.addEventListener('click', () => {openPopup(popupWAddElements)});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupFormProfile.addEventListener('submit', formSubmitHandler);
popupFormElements.addEventListener('submit', addElementPlase);

/* Удаление модификатора при закрытии попапа различными способами */
buttonCloseProfile.addEventListener('click', () => {closePopup(popupWProfile)});
buttonCloseAddElements.addEventListener('click', () => {closePopup(popupWAddElements)});
buttonClosePhoto.addEventListener('click', () => {closePopup(popupWPhoto)});
popupWProfile.addEventListener('click', clickOverlay);
popupWAddElements.addEventListener('click', clickOverlay);
popupWPhoto.addEventListener('click', clickOverlay);