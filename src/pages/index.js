import './index.css'; // импорт главного файла стилей 
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupConfirmation } from '../components/PopupConfirmation.js';
import { Api } from '../components/Api.js';
import {
  errorList,
  buttonEditPropile,
  popupFormProfile,
  popupNameOpen,
  popupJobOpen,
  buttonAddPlace,
  popupFormElements,
  buttonEditAvatar,
  popupAvatarOpen,
  popupFormAvatar
} from '../utils/data.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '9b04affb-1b35-4c82-b9cf-6dde041a3e27',
    'Content-Type': 'application/json'
  }
});

// Отрисовка страницы 
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards])=> {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;

    cardList.renderItems(initialCards);
  })
  .catch(err => console.log('Ошибка: ', err, ' код ошибки: ', err.status));

let userId;
const cardList = new Section({
  renderer: (item) => {
    const cardElement = createNewCard(item);
    cardList.addItem(cardElement);
  }
}, ".elements");

// то что мы видим в профайле
const userInfo = new UserInfo({ 
  infoNameSelector: '.profile__name', // h1, p in profile
  infoJobSelector: '.profile__occupation',
  infoImageSelector: '.profile__image'
}, api);

// Изменение аватара пользователя
const avatarEdit = new PopupWithForm({
  popupSelector: ".popup_avatar",
  submitForm: (data) => {
    api.patchUserAvatar({ avatar: data.link })
    .then(() => {
      userInfo.setUserAvatar({ avatar: data.link });
      avatarEdit.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarEdit.loadText(false);
    });
  }
});
avatarEdit.setEventListeners();
buttonEditAvatar.addEventListener("click", function () {
  validFormAvatar.resetValidation();
  avatarEdit.open();
});

// Изменение данных пользователя
const profileSample = new PopupWithForm({
  popupSelector: ".popup_profile",
  submitForm: (data) => {
    api.patchUserInfo({ name: data.name, about: data.about })
    .then((res) => {
      userInfo.setUserInfo(res);
      profileSample.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      profileSample.loadText(false);
    });
  }
});
profileSample.setEventListeners();
buttonEditPropile.addEventListener("click", () => {
  setInfo();
  validFormProfile.resetValidation();
  profileSample.open();
});


// Добавление новой карточки из данных из попапа
const createSample = new PopupWithForm({
  popupSelector: ".popup_elements",
  submitForm: (data) => {
    api.postCard(data)
      .then((res) => {
        const card = createNewCard(res);
        cardList.addItem(card);
        createSample.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        profileSample.loadText(false);
      });
  }
}, api);
createSample.setEventListeners();
buttonAddPlace.addEventListener("click", function (evt) {
  validFormElements.resetValidation();
  createSample.open();
});

// Создание новой карточки
const createNewCard = (item) => {
  const card = new Card({
    arrey: item,
    userId,
    handleCardClick: () => {
      cardImagePopup.open(item);
    },
    likeHandleClick: (likeCondition, thisCardId, likeToClik) => {
      if(likeCondition){
        api.deleteLikeCard(thisCardId)
          .then((data) => {
            likeToClik(data.likes);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.putLikeCard(thisCardId)
        .then((data) => {
          likeToClik(data.likes);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    openPopapDeleteThisCard: (thisCard, thisCardId) => {
      deleteCardPopap.open(() => {
        api.deleteCard(thisCardId)
          .then( () => {
            thisCard.removeCard();
          })
          .catch((err) => console.log(err));
      });
    }
  }, '#plase-template');
  return card.createCard();
};

// создать метод для отслеживания лайков


const setInfo = () => {
  const userItems = userInfo.getUserInfo();
  popupNameOpen.value = userItems.popupName; // input in popup
  popupJobOpen.value = userItems.popupJob;
}
const setAvatar = () => {
  console.log(userInfo.getUserInfo());
  const userItems = userInfo.getUserInfo();
  popupAvatarOpen.value = userItems.popupAvatar;// input in popup
}

// Удаление карточки
const deleteCardPopap = new PopupConfirmation(".popup_delete-card");
deleteCardPopap.setEventListeners();

// превью изображения из карточки
const cardImagePopup = new PopupWithImage(".popup_photo");
cardImagePopup.setEventListeners();

// создаем объект класса валидации для проверки формы профайла пользователя
const validFormProfile = new FormValidator(errorList, popupFormProfile);
validFormProfile.enableValidation();

// создаем объект класса валидации для проверки формы аватара пользователя
const validFormAvatar = new FormValidator(errorList, popupFormAvatar);
validFormAvatar.enableValidation();

// создаем объект класса валидации для проверки формы создания карточек
const validFormElements = new FormValidator(errorList, popupFormElements);
validFormElements.enableValidation();

