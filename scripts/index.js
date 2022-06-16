let buttonEdit = document.querySelector('.profile__edit-name');
let buttonAddPlace = document.querySelector('.profile__add');
let buttonCloseProfile = document.querySelector('.popup__close_window_profile');
let buttonCloseAddElements = document.querySelector('.popup__close_window_elements');
let popupWProfile = document.querySelector('#edit_profile');
let popupWAddElements = document.querySelector('#add_elements');
let popupName = document.querySelector('.popup__text_form_name');
let popupJob = document.querySelector('.popup__text_form_job');
let formElement1 = document.querySelector('form[name="popup-form1"]');
let formElement2 = document.querySelector('form[name="popup-form2"]');
let ElementsContainer = document.querySelector('.elements');

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

function OpenPopup(thisPopup) {
    thisPopup.classList.add('popup_opened');
    /* Подтягивание значений полей в попап при открытии */
    let profileName = document.querySelector('.profile__name');
    let profileOccupation = document.querySelector('.profile__occupation');
    popupName.value = profileName.textContent;
    popupJob.value = profileOccupation.textContent;
}

function ClosePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
}

/* Переключатель лайков */
function favorits () {
  const header = document.getElementById("elements");
  const btns = header.getElementsByClassName("elements__favorit");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            if(this.className == "elements__favorit"){
                this.className = "elements__favorit elements__favorit_active";
            } else this.className = "elements__favorit";
        });
    }
}

/* Работа с изменением данных формы */
function MakeElementPlase (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Берем данные из попапа
  const PlaceName = document.querySelector('.popup__text_form_plase').value;
  const PlaceLink = document.querySelector('.popup__text_form_link').value;

  addElementPlase(PlaceName, PlaceLink);
}

function addElementPlase (name, link) {
  const plaseTemplate = document.querySelector('#plase-template').content;
  const ElementContainer = plaseTemplate.querySelector('.elements__container').cloneNode(true);

  ElementContainer.querySelector('.elements__name').textContent = name;
  ElementContainer.querySelector('.elements__image').src = link;
  ElementContainer.querySelector('.elements__image').alt = name;
  ElementContainer.querySelector('.elements__favorit').id = `favorit${Date.now()}`;

  ElementsContainer.prepend(ElementContainer);
  ClosePopup(popupWAddElements);
  favorits();
}

function formSubmitHandler (evt) {
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
  addElementPlase(initialCards[i].name, initialCards[i].link);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement1.addEventListener('submit', formSubmitHandler);
formElement2.addEventListener('submit', MakeElementPlase);

/* Добавление модификатора при открытии попапа */
buttonEdit.addEventListener('click', () => {OpenPopup(popupWProfile)});
buttonAddPlace.addEventListener('click', () => {OpenPopup(popupWAddElements)});

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
