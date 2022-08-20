export class UserInfo {
  constructor({ infoNameSelector, infoJobSelector }) {
    this._popupName = infoNameSelector;
    this._popupJob = infoJobSelector; 
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