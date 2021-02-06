const initialCards = [ // Массив с карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горный пейзаж'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Вид на зимнее озеро'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Фото многоэтажного района'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Заснеженная горная вершина'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Фото железной дороги в лесу'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фото скалы у озера Байкал'
  }
];

// Объявленные переменные и DOM элементы

// Элементы popup формы с редактированием профиля
const overlayEl = document.querySelector('.popup_type_edit-profile'); // overlay
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

// console.log(templateCardEl);

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

  closeOverlay() // Использую уже существующую функцию внутри новой, чтобы не дублировать код
  }

  function initialRender() {
    const cards = initialCards // Объявил элемент cards, в который будут записываться данные после ремапа
        .map(addCard);

    cardsContanerEl.append(...cards); // И в метод append в качестве аргумента использую cards с опертором spread
}

function addCard(card) {
  const newCard = templateCardEl.content.cloneNode(true); // Объявил локальную переменную newCard и придал ей значение равное контенту в теге template = создал новую пустую карточку
  // Сослался на элементы в созданной карточке
  const cardTitle = newCard.querySelector('.elements__text');
  const cardImg = newCard.querySelector('.elements__photo');
  // Заполнил контентом из массива новую карточку
  cardTitle.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.alt;

  return newCard; // Функция используется в методе .map, которому нужно возвращать элемент для нового массива.
}





// Обработчики

openButtonEl.addEventListener('click', openOverlay); // Открытие popup

// Повесил addEventListener на переменную openButton c аргументами click и openOverlay | openOverlay в аргементах - ранее объявленная функция
closeButtonEl.addEventListener('click', closeOverlay); // Закрытие popup
formElement.addEventListener('submit', formSubmitHandler); // Сохранение изменений данных профиля


initialRender();