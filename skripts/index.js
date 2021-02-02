// Объявленные переменные и DOM элементы

let overlay = document.querySelector('.popup'); // Объявил оверлей с попапом
let openButton = document.querySelector('.profile__edit-button'); // Объявил кнопку открытия попапа
let closeButton = document.querySelector('.popup__close-button'); // Объявил кнопку закрытия попапа

let formElement = document.querySelector('.popup__contaner');
let nameInput = document.querySelector('.popup__input_item_name');
let captureInput = document.querySelector('.popup__input_item_capture'); // Объявил элементы для формы и полей ввода формы.

let profileName = document.querySelector('.profile__name');
let profileCapture = document.querySelector('.profile__capture'); // Объявил элементы, куда нужно вставлять введеный текст из формы

// Функция открытия оверлея с попапом

function openOverlay() { //"overlay" в функции - это объявленная ранее переменная в DOM | При методе classList точку перед именем класса ставить не нужно
  overlay.classList.add('popup_opened'); // Метод classList.add добавляет модификатор, раскрывая оверлей с попапом
  nameInput.value = profileName.textContent;
  captureInput.value = profileCapture.textContent; // Эти две строки передают исходный текст с открывшуюся форму, однако с кучей пробелов слева и справа
}

// Функция закрытия оверлея с попапом

function closeOverlay() {
  overlay.classList.remove('popup_opened'); 
}

// Функция сохранения изменений данных профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileCapture.textContent = captureInput.value; // При помощи textContent перезаписывается на страницу то что сейчас введено в input

  closeOverlay() // Использую уже существующую функцию внутри новой
  }

// Обработчики

openButton.addEventListener('click', openOverlay); // Повесил addEventListener на переменную openButton c аргументами click и openOverlay | openOverlay здесь - ранее объявленная функция
closeButton.addEventListener('click', closeOverlay); // Аналогично предыдущему "слушателю"
formElement.addEventListener('submit', formSubmitHandler);