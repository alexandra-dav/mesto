const buttonEdit = document.querySelector('.profile__edit-name');
const buttonAddPlace = document.querySelector('.profile__add');
const buttonCloseProfile = document.querySelector('.popup__close_window_profile');
const buttonCloseAddElements = document.querySelector('.popup__close_window_elements');
const popupWProfile = document.querySelector('#edit_profile');
const popupWAddElements = document.querySelector('#add_elements');
let popupName = popupWProfile.querySelector('.popup__text_form_name');
let popupJob = popupWProfile.querySelector('.popup__text_form_job');
let formElement1 = popupWProfile.querySelector('form[name="popup-form"]');
let formElement2 = popupWAddElements.querySelector('form[name="popup-form"]');
const ElementsContainer = document.querySelector('.elements');

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

function OpenPopupProfile() {
  popupWProfile.classList.add('popup_opened');
  /* Подтягивание значений полей в попап при открытии */
  let profileName = document.querySelector('.profile__name');
  let profileOccupation = document.querySelector('.profile__occupation');
  popupName.value = profileName.textContent;
  popupJob.value = profileOccupation.textContent;
}

function OpenPopupPlase() {
  popupWAddElements.classList.add('popup_opened');
}

function ClosePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
}

// Функция добавления-удаления класса у сердечка
function favorit(e) {
  const eventTarget = e.target;
  if (eventTarget.className === 'elements__favorit elements__favorit_active'){
    eventTarget.className = 'elements__favorit';
  }else eventTarget.className = 'elements__favorit elements__favorit_active';
}

// Функция удаления карточки
function removeCard(e) {
  const eventPath1 = e.path[1];
  eventPath1.remove();
}

// Функция просмотра фото карточки
/* const viewPhoto = ElementsContainer.querySelector('elements__image');
viewPhoto.addEventListener('click', (e) => {

}); */

// Создание новой карточки
function CreateElementPlase(name, link) {
  const plaseTemplate = document.querySelector('#plase-template').content;
  const ElementContainer = plaseTemplate.querySelector('.elements__container').cloneNode(true);

  ElementContainer.querySelector('.elements__name').textContent = name;
  ElementContainer.querySelector('.elements__image').src = link;
  ElementContainer.querySelector('.elements__image').alt = name;

  ElementsContainer.prepend(ElementContainer);

  const LikeBtn = ElementsContainer.querySelector('.elements__favorit');
  LikeBtn.addEventListener('click', favorit);

  // Удаление карточки
  const DeleteBtn = ElementsContainer.querySelector('.elements__delete');
  DeleteBtn.addEventListener('click', removeCard);

  ClosePopup(popupWAddElements);
}

// Добавление новой карточки
function AddElementPlase(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Берем данные из попапа
  const PlaceName = popupWAddElements.querySelector('.popup__text_form_plase');
  const PlaceLink = popupWAddElements.querySelector('.popup__text_form_link');
  
  CreateElementPlase(PlaceName.value, PlaceLink.value);

  PlaceName.value = '';
  PlaceLink.value = '';
}

// Изменение данных в профиле
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const jobInput = popupJob.value;
  const nameInput = popupName.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const docName = document.querySelector('.profile__name');
  const docJob = document.querySelector('.profile__occupation');
  // Вставьте новые значения с помощью textContent
  docName.textContent = nameInput;
  docJob.textContent = jobInput;
  ClosePopup(popupWProfile);
}

// Создаем дефолтное наполнение
for(let i = 0; i < initialCards.length; i++) {
  CreateElementPlase(initialCards[i].name, initialCards[i].link);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement1.addEventListener('submit', formSubmitHandler);
formElement2.addEventListener('submit', AddElementPlase);

/* Добавление модификатора при открытии попапа */
buttonEdit.addEventListener('click', OpenPopupProfile);
buttonAddPlace.addEventListener('click', OpenPopupPlase);

/* Удаление модификатора при закрытии попапа различными способами */
buttonCloseProfile.addEventListener('click', () => {ClosePopup(popupWProfile)});
buttonCloseAddElements.addEventListener('click', () => {ClosePopup(popupWAddElements)});

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