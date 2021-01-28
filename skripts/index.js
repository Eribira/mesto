let overlay = document.querySelector('.overlay'); // Объявил оверлей с попапом
let openButton = document.querySelector('.profile__edit-button'); // Объявил кнопку открытия попапа
let closeButton = document.querySelector('.overlay__close-button'); // Объявил кнопку закрытия попапа

let formElement = document.querySelector('.overlay__popup');
let nameInput = document.querySelector('.overlay__input_item_name');
let captureInput = document.querySelector('.overlay__input_item_capture'); // Объявил элементы для формы и полей ввода формы.

let profileName = document.querySelector('.profile__name');
let profileCapture = document.querySelector('.profile__capture'); // Объявил элементы, куда нужно вставлять введеный текст из формы

function openOverlay() { //"overlay" в функции - это объявленная ранее переменная в DOM | При методе classList точку перед именем класса ставить не нужно
  overlay.classList.remove('overlay_display_none'); // Метод classList.remove удаляет модификатор display_none, раскрывая оверлей с попапом
  nameInput.value = profileName.textContent;
  captureInput.value = profileCapture.textContent; // Эти две строки передают исходный текст с открывшуюся форму, однако с кучей пробелов слева и справа
}

openButton.addEventListener('click', openOverlay); // Повесил addEventListener на переменную openButton c аргументами click и openOverlay | openOverlay здесь - ранее объявленная функция

function closeOverlay() {
  overlay.classList.add('overlay_display_none'); // Метод classList.add добавляет модификатор display_none, скрывая оверлей с попапом
}

closeButton.addEventListener('click', closeOverlay); // Аналогично предыдущему "слушателю"

function formSubmitHandler(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileCapture.textContent = captureInput.value; // При помощи textContent перезаписывается на страницу то что сейчас введено в input

  overlay.classList.add('overlay_display_none');
}

formElement.addEventListener('submit', formSubmitHandler);
