let overlay = document.querySelector('.overlay'); // Объявил оверлей с попапом
let openButton = document.querySelector('.profile__edit-button'); // Объявил кнопку открытия попапа
let closeButton = document.querySelector('.overlay__close-button'); // Объявил кнопку закрытия попапа

function openOverlay() {
  overlay.classList.remove('overlay_display_none'); // Метод classList.remove удаляет модификатор display_none, раскрывая оверлей с попапом
}

//"overlay" в функции - это объявленная ранее переменная в DOM | При методе classList точку перед именем класса ставить не нужно

openButton.addEventListener('click', openOverlay); // Повесил addEventListener на переменную openButton c аргументами click и openOverlay | openOverlay здесь - ранее объявленная функция

function closeOverlay() {
  overlay.classList.add('overlay_display_none'); // Метод classList.add добавляет модификатор display_none, скрывая оверлей с попапом
}

closeButton.addEventListener('click', closeOverlay);


// openOverlay();

// console.log(overlay, openButton, closeButton);

