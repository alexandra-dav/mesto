//import { Api } from "./Api";

export class UserInfo {
  constructor({ infoNameSelector, infoJobSelector, infoImageSelector }) {
    this._popupName = document.querySelector(infoNameSelector);
    this._popupJob = document.querySelector(infoJobSelector);
    this._popupAvatar = document.querySelector(infoImageSelector);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      popupName: this._popupName.textContent,
      popupJob: this._popupJob.textContent,
      popupAvatar: this._popupAvatar.src
    }
  }

  // принимает новые данные пользователя 
  // и добавляет их на страницу.
  setUserInfo(data) {
    this._popupName.textContent = data.name;
    this._popupJob.textContent = data.about;
  }

  // для изменения аватара пользоватля
  setUserAvatar(data) {
    this._popupAvatar.src = data.avatar;
  }
}