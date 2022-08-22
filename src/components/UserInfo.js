export class UserInfo {
  constructor({ infoNameSelector, infoJobSelector }) {
    this._popupName = document.querySelector(infoNameSelector);
    this._popupJob = document.querySelector(infoJobSelector); 
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      popupName: this._popupName.textContent,
      popupJob: this._popupJob.textContent
    }
  }

  // принимает новые данные пользователя 
  // и добавляет их на страницу.
  setUserInfo(data) {
    this._popupName.textContent = data.popupName;
    this._popupJob.textContent = data.popupJob;
  }
}