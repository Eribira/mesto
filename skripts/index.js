const initialCards = [ // Массив с карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Объявленные переменные и DOM элементы

// Элементы popup формы с редактированием профиля
const overlayEl = document.querySelector('.popup'); // overlay
const openButtonEl = document.querySelector('.profile__edit-button'); // Кнопка открытия popup
const closeButtonEl = document.querySelector('.popup__close-button'); // Кнопка закрытия popup

const formElement = document.querySelector('.popup__contaner'); // Элемент формы
const nameInputEl = document.querySelector('.popup__input_item_name'); // Строка ввода имени
const captureInputEl = document.querySelector('.popup__input_item_capture'); // Строка ввода для поля capture

// Элементы в секции profile, куда перезаписываются данные
const profileNameEl = document.querySelector('.profile__name');
const profileCaptureEl = document.querySelector('.profile__capture');


const cardsContanerEl = document.querySelector('.elements'); // Контейнер для добавления карточек
const templateCardEl = document.querySelector('.elements-item-template'); // Шаблон с html карточки

console.log(templateCardEl);

// Функция открытия оверлея с попапом

function openOverlay() { //"overlay" в функции - это объявленная ранее переменная в DOM | При методе classList точку перед именем класса ставить не нужно
  overlayEl.classList.add('popup_opened'); // Метод classList.add добавляет модификатор, раскрывая оверлей с попапом
  nameInputEl.value = profileNameEl.textContent;
  captureInputEl.value = profileCaptureEl.textContent; // Эти две строки передают исходный текст с открывшуюся форму
}

// Функция закрытия оверлея с попапом

function closeOverlay() {
  overlayEl.classList.remove('popup_opened'); 
}

// Функция сохранения изменений данных профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  
  profileNameEl.textContent = nameInputEl.value; // value для input - это содерживое строки ввода
  profileCaptureEl.textContent = captureInputEl.value; // При помощи textContent перезаписывается на страницу то что сейчас введено в input

  closeOverlay() // Использую уже существующую функцию внутри новой
  }

  function initialRender() {
    const cards = initialCards
        .map(addCard);

    cardsContanerEl.append(...cards);
}

function addCard(item) {
  const newCard = templateCardEl.content.cloneNode(true);
  const cardTitle = newCard.querySelector('.elements__text');
  const cardImg = newCard.querySelector('.elements__photo');

  cardTitle.textContent = item.name;
  cardImg.src = item.link;

  return newCard;
}





// Обработчики

openButtonEl.addEventListener('click', openOverlay); // Открытие popup
// Повесил addEventListener на переменную openButton c аргументами click и openOverlay | openOverlay в аргементах - ранее объявленная функция
closeButtonEl.addEventListener('click', closeOverlay); // Закрытие popup
formElement.addEventListener('submit', formSubmitHandler); // Сохранение изменений данных профиля


initialRender();