export default class Section {
  constructor({ items, renderer }, containerSelector){
    this._items = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems() {
    this._items.forEach(item => {
        this._renderer(item); // отрисовка одного эллемента
    });
  }

  // метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }
}