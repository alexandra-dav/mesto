import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, errorList } from './data.js';

const popupWProfile = document.querySelector('#edit_profile');
const buttonEditPropile = document.querySelector('.profile__edit-name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupFormProfile = document.forms.popupFormProfile;
// Выберите элементы, куда должны быть вставлены значения полей
const popupName = popupFormProfile.elements.popupName;
const popupJob = popupFormProfile.elements.popupJob;
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');

const elementsPlace = document.querySelector('.elements');
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
  validFormProfile._toggleButtonState(); //когда закрываем попап блокируем кнопку
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
  const cardElement = renderCard({
    name: placeName.value,
    link: placeLink.value
  });
  elementsPlace.prepend(cardElement);
  evt.target.reset();
  validFormElements._toggleButtonState(); //когда закрываем попап блокируем кнопку
  closePopup(popupWAddElements);
};

// Изменение данных в профиле
function changeProfileInfo(evt) {
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
  return cardElement;
};

initialCards.forEach((element) => {
  elementsPlace.prepend(renderCard(element));
});

// создаем объект класса валидации для проверки формы профайла пользователя
const validFormProfile = new FormValidator(errorList, popupFormProfile);
validFormProfile.enableValidation();

/* Добавление модификатора при открытии попапа */
buttonEditPropile.addEventListener('click', () => {
  openPopup(popupWProfile);
  validFormProfile._hideInputError(popupName);
  validFormProfile._hideInputError(popupJob);
  addDataProfile();
});

// создаем объект класса валидации для проверки формы создания карточек
const validFormElements = new FormValidator(errorList, popupFormElements);
validFormElements.enableValidation();

buttonAddPlace.addEventListener('click', () => {
  popupFormElements.reset();
  validFormElements._hideInputError(placeName);
  validFormElements._hideInputError(placeLink);
  openPopup(popupWAddElements);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupFormProfile.addEventListener('submit', changeProfileInfo);
popupFormElements.addEventListener('submit', addElementPlase);

/* Удаление модификатора при закрытии попапа различными способами */
buttonCloseProfile.addEventListener('click', () => {closePopup(popupWProfile)});
buttonCloseAddElements.addEventListener('click', () => {closePopup(popupWAddElements);});
buttonClosePhoto.addEventListener('click', () => {closePopup(popupWPhoto)});
console.log('Hello, World!');