import './index.css'; // импорт главного файла стилей 
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, errorList } from '../data.js';

const popupWProfile = document.querySelector('#edit_profile');
const buttonEditPropile = document.querySelector('.profile__edit-name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupFormProfile = document.forms.popupFormProfile;
// Выберите элементы, куда должны быть вставлены значения полей
const popupNameOpen = popupFormProfile.elements.popupName;
const popupJobOpen = popupFormProfile.elements.popupJob;

const popupWAddElements = document.querySelector('#add_elements');
const buttonAddPlace = document.querySelector('.profile__add');

const popupFormElements = document.forms.popupFormElements;
// Берем данные из попапа
const placeName = popupFormElements.elements.popupPlase;
const placeLink = popupFormElements.elements.popupLink;

export const popupWPhoto = document.querySelector('#view_photo');
export const changeMyName = popupWPhoto.querySelector('.photo__caption');
export const changeMyLink = popupWPhoto.querySelector('.photo__image');

const buttonElement = popupWAddElements.querySelector('.popup__button'); // находим кнопку

// то что мы видим в профайле
const userInfo = new UserInfo({ 
  infoNameSelector: profileName, // h1, p in profile
  infoJobSelector: profileOccupation
});

const setInfo = () => {
  const userItems = userInfo.getUserInfo();
  popupNameOpen.value = userItems.popupName; // input in popup
  popupJobOpen.value = userItems.popupJob;
}

const profileSample = new PopupWithForm({
  popupSelector: ".popup_profile",
  submitForm: (data) => {
    userInfo.setUserInfo(data);
    profileSample.close();
  }
});
profileSample.setEventListeners();

// создаем объект класса валидации для проверки формы профайла пользователя
const validFormProfile = new FormValidator(errorList, popupFormProfile);
validFormProfile.enableValidation();

buttonEditPropile.addEventListener("click", () => {
  setInfo();
  validFormProfile.resetValidation();
  profileSample.open();
});

// превью изображения из карточки
const cardImagePopup = new PopupWithImage(".popup_photo");
cardImagePopup.setEventListeners();

// Создание карточки
const createNewCard = (item) => {
  const card = new Card({
    arrey: item,
    handleCardClick: () => {
      cardImagePopup.open(item);
    }
  }, '#plase-template');
  return card.createCard();
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);
    cardList.addItem(cardElement);
  }
}, ".elements");

cardList.renderItems();





// создаем объект класса валидации для проверки формы создания карточек
const validFormElements = new FormValidator(errorList, popupFormElements);
validFormElements.enableValidation();

// Добавление Нового Места
const createSample = new PopupWithForm({
  popupSelector: ".popup_elements",
  submitForm: (data) => {
    console.log(data);
    const cardObj = {};
    cardObj.name = data.popupPlase;
    cardObj.link = data.popupLink;
    const cardElement = createNewCard(cardObj);
    cardList.addItem(cardElement);
    createSample.close();
  }
});
createSample.setEventListeners();
buttonAddPlace.addEventListener("click", function (evt) {
  validFormElements.resetValidation();
  createSample.open();
});