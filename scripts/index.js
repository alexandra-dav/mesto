import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupWProfile = document.querySelector('#edit_profile');
const buttonEditPropile = document.querySelector('.profile__edit-name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupFormProfile = document.forms.popupFormProfile;
// Выберите элементы, куда должны быть вставлены значения полей
const popupName = popupFormProfile.elements.popupName;
const popupJob = popupFormProfile.elements.popupJob;
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');


const popupWAddElements = document.querySelector('#add_elements');
const buttonAddPlace = document.querySelector('.profile__add');
const buttonCloseAddElements = popupWAddElements.querySelector('.popup__close_window_elements');
const popupFormElements = document.forms.popupFormElements;
// Берем данные из попапа
const placeName = popupFormElements.elements.popupPlase;
const placeLink = popupFormElements.elements.popupLink;

export const popupWPhoto = document.querySelector('#view_photo');
export const changeMyName = popupWPhoto.querySelector('.photo__caption');
export const changeMyLink = popupWPhoto.querySelector('.photo__image');
const buttonClosePhoto = popupWPhoto.querySelector('.popup__close_window_photo');

const buttonElement = popupWAddElements.querySelector('.popup__button'); // находим кнопку

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

// Массив с классами ошибок
  const errorList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

//Закрыть попап на нажатию Escape
const clickEscape = (e) => {
  const key = e.code;
  if (key === "Escape") {
    // Искать открытый попап
    const closeThis = document.querySelector('.popup_opened');
    closePopup(closeThis);
  }
};

// Закрытие попапа кликом на оверлей
const clickOverlay = function(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

// Открыть попап
export function openPopup(e) {
  e.classList.add('popup_opened');
  document.addEventListener('keydown', clickEscape);
  e.addEventListener('click', clickOverlay);
};

// Подтягивание значений полей в попап при открытии
function addDataProfile() {
  popupName.value = profileName.textContent;
  popupJob.value = profileOccupation.textContent;
  const validFormProfile = new FormValidator(errorList, popupFormProfile);
  validFormProfile._toggleButtonState();
  //const buttonElement = popupWProfile.querySelector('.popup__button'); // находим кнопку
  //toggleButtonState([popupName, popupJob], buttonElement, errorList); //когда закрываем попап блокируем кнопку
};

// Закрыть попап
function closePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', clickEscape); // снять слушатель
  thisPopup.removeEventListener('click', clickOverlay);
};

// Добавление новой карточки
function addElementPlase(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({
    name: placeName.value,
    link: placeLink.value
  });
  evt.target.reset();
  const validFormElements = new FormValidator(errorList, popupFormElements);
  validFormElements.enableValidation();
  //toggleButtonState([placeName, placeLink], buttonElement, errorList); //когда закрываем попап блокируем кнопку
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

// Добавление карточки в разметку
const renderCard = (item) => {
  const card = new Card(item, '#plase-template');
  const cardElement = card.createCard();
  document.querySelector('.elements').prepend(cardElement);
};

initialCards.forEach(renderCard);

/* Добавление модификатора при открытии попапа */
buttonEditPropile.addEventListener('click', () => {
  openPopup(popupWProfile);
  const validFormProfile = new FormValidator(errorList, popupFormProfile);
  validFormProfile.enableValidation();
/*   hideInputError(popupFormProfile, popupName, errorList);
  hideInputError(popupFormProfile, popupJob, errorList); */
  addDataProfile();
});

buttonAddPlace.addEventListener('click', () => {
  popupFormElements.reset();
  const validFormElements = new FormValidator(errorList, popupFormElements);
  validFormElements.enableValidation();
/*   checkInputValidity(popupFormElements, placeName, errorList);
  checkInputValidity(popupFormElements, placeLink, errorList); */
  openPopup(popupWAddElements);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupFormProfile.addEventListener('submit', formSubmitHandler);
popupFormElements.addEventListener('submit', addElementPlase);

/* Удаление модификатора при закрытии попапа различными способами */
buttonCloseProfile.addEventListener('click', () => {closePopup(popupWProfile)});
buttonCloseAddElements.addEventListener('click', () => {closePopup(popupWAddElements);});
buttonClosePhoto.addEventListener('click', () => {closePopup(popupWPhoto)});