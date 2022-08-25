export class Section {
  constructor({ renderer }, containerSelector){
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems(renderItems) {// отрисовка одного эллемента
    renderItems.forEach(data => {this._renderer(data)});
  }

  // метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
} 