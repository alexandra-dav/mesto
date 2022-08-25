/* При загрузке на странице должно быть 6 карточек, 
которые добавит JavaScript.  */
export const initialCards = [
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
]

// Массив с классами ошибок
export const errorList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const buttonEditPropile = document.querySelector('.profile__edit-name');
export const popupFormProfile = document.forms.popupFormProfile;
// Выберите элементы, куда должны быть вставлены значения полей
export const popupNameOpen = popupFormProfile.elements.popupName;
export const popupJobOpen = popupFormProfile.elements.popupJob;
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
export const popupFormAvatar = document.forms.popupFormAvatar;
export const popupAvatarOpen = popupFormAvatar.elements.popupAvatar;

export const buttonAddPlace = document.querySelector('.profile__add');
export const popupFormElements = document.forms.popupFormElements;
export const buttonDeleteCard = document.querySelector('#delete_card_popup');