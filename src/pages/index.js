import './index.css'; // импорт главного файла стилей 
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, errorList } from '../utils/data.js';
import {
  buttonEditPropile,
  popupFormProfile,
  popupNameOpen,
  popupJobOpen,
  buttonAddPlace,
  popupFormElements
} from '../utils/data.js';

// то что мы видим в профайле
const userInfo = new UserInfo({ 
  infoNameSelector: '.profile__name', // h1, p in profile
  infoJobSelector: '.profile__occupation'
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

// Создание новой карточки
const createNewCard = (item) => {
  const card = new Card({
    arrey: item,
    handleCardClick: () => {
      cardImagePopup.open(item);
    }
  }, '#plase-template');
  return card.createCard();
};

// Добавление новых карточек из списка initialCards
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

// Добавление новой карточки из данных из попапа
const createSample = new PopupWithForm({
  popupSelector: ".popup_elements",
  submitForm: (data) => {
    const cardElement = createNewCard(data);
    cardList.addItem(cardElement);
    createSample.close();
  }
});
createSample.setEventListeners();
buttonAddPlace.addEventListener("click", function (evt) {
  validFormElements.resetValidation();
  createSample.open();
});