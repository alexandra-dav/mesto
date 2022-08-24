//import { Api } from "./Api";

export class UserInfo {
  constructor({ infoNameSelector, infoJobSelector, infoImageSelector }, api) {
    this._popupName = document.querySelector(infoNameSelector);
    this._popupJob = document.querySelector(infoJobSelector);
    this._popupAvatar = document.querySelector(infoImageSelector);
    this._api = api;
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
    this._api.patchUserInfo({ name: this._popupName.textContent, about: this._popupJob.textContent });
  }

  // для изменения аватара пользоватля
  setUserAvatar(data) {
    this._popupAvatar.src = data.avatar;
    this._api.patchUserAvatar(this._popupAvatar.src);
  }
}