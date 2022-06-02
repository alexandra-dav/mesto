let buttonEdit = document.querySelector('.profile__edit-name');
let buttonClose = document.querySelector('.popup__close');
let popupW = document.querySelector('.popup');
let popupName = document.querySelector('input[name="popupName"]');
let popupJob = document.querySelector('input[name="popupJob"]');
let formElement = document.querySelector('.popup__save');

function OpenPopup() {
    popupW.classList.add('popup_opened');
}

function ClosePopup() {
    popupW.classList.remove('popup_opened');
}

/* Добавление модификатора при открытии попапа */
buttonEdit.addEventListener('click', function() {
    OpenPopup();
    /* Подтягивание значений полей в попап при открытии */
    let profileName = document.querySelector('.profile__name');
    let profileOccupation = document.querySelector('.profile__occupation');
    popupName.value = profileName.textContent;
    popupJob.value = profileOccupation.textContent;
});

/* Удаление модификатора при закрытии попапа различными способами */
buttonClose.addEventListener('click', function() {
    ClosePopup();
});

popupW.addEventListener('click', function(e) {
    if (e.target === e.currentTarget) {
        popupW.classList.remove('popup_opened');
    }
});

document.addEventListener('keydown', function(e){
    if (e.code === "Escape") {
        popupW.classList.remove('popup_opened');
    }
});

/* Работа с изменением данных формы */
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    var jobInput = popupJob.value;
    var nameInput = popupName.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    var docName = document.querySelector('.profile__name');
    var docJob = document.querySelector('.profile__occupation');
    // Вставьте новые значения с помощью textContent
    docName.textContent = nameInput;
    docJob.textContent = jobInput;
    ClosePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('click', formSubmitHandler);


/* Переключатель лайков */
/* function favorits () {
    var header = document.getElementById("elements");
    var btns = header.getElementsByClassName("elements__favorit");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            if(this.className == "elements__favorit"){
                this.className = "elements__favorit-active";
            } else this.className = "elements__favorit";
        });
    }
}
favorits(); */


