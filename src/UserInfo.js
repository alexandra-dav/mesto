export class UserInfo {
  constructor(userData) {
    this._name = userData.name.value;
    this._info = userData.info.value;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userName = this._name.textContent;
    const userInfo = this._info.textContent;
    return { 
        name: userName,
        info: userInfo 
    };
  }

  // принимает новые данные пользователя 
  // и добавляет их на страницу.
  setUserInfo(newData) {
    this._name = newData.name.value;
    this._info = newData.info.value;
  }
}