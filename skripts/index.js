
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


// Элементы popup с редактированием профиля
const editPopupEl = document.querySelector('.edit-popup'); // Модуль попапа редактирования профиля
const editButtonEl = document.querySelector('.profile__edit-button'); // Кнопка открытия редактирования профиля
const closeEditPopupEl = document.querySelector('.edit-popup__close-button'); // Кнопка закрытия редактирования профиля
// console.log(editPopupEl, editButtonEl, closeEditformEl);
const editFormEl = document.querySelector('.edit-popup__contaner'); // Элемент формы редактироания профиля
const nameInputEl = document.querySelector('.edit-popup__input_item_name'); // Строка ввода имени
const captureInputEl = document.querySelector('.edit-popup__input_item_capture'); // Строка ввода для поля capture
// console.log(editFormEl, nameInputEl, captureInputEl);
// Элементы в секции profile, куда перезаписываются данные
const profileNameEl = document.querySelector('.profile__name');
const profileCaptureEl = document.querySelector('.profile__capture');

// Функция открытия редактирования профиля
function openEditPopup() {
  editPopupEl.classList.add('edit-popup_opened'); // Метод classList.add добавляет модификатор, раскрывая оверлей с попапом
  nameInputEl.value = profileNameEl.textContent;
  captureInputEl.value = profileCaptureEl.textContent; // Эти две строки передают исходный текст с открывшуюся форму
}

// Функция сохранения изменений данных профиля
function editSubmitHandler(evt) {
  evt.preventDefault();
  
  profileNameEl.textContent = nameInputEl.value; // value для input - это содерживое строки ввода
  profileCaptureEl.textContent = captureInputEl.value; // При помощи textContent перезаписывается на страницу то что сейчас введено в input

  closeEditPopup() // Использую уже существующую функцию внутри новой, чтобы не дублировать код
  }

// Функция закрытия попапа редактирования
function closeEditPopup() {
  editPopupEl.classList.remove('edit-popup_opened');
}

// EventListener
editButtonEl.addEventListener('click', openEditPopup); // Открытие popup редактирования
editFormEl.addEventListener('submit', editSubmitHandler); // Сохранение изменений данных профиля
closeEditPopupEl.addEventListener('click', closeEditPopup); // Закрытие popup

// Элементы попап с добавлением карточки
const addPopupEl = document.querySelector('.add-popup'); // Модуль попапа новой карточки
const addButtonEl = document.querySelector('.profile__add-button'); // Кнопка открытия добавления
const closeAddPopupEl = document.querySelector('.add-popup__close-button'); // Кнопка закрытия попап добавления

const addFormEl = document.querySelector('.add-popup__contaner');

// Функция открытия попап добавления карточек
function openAddPopup() {
  addPopupEl.classList.add('add-popup_opened');
}

// Функция закрытия попап добавления карточек
function closeAddPopup() {
  addPopupEl.classList.remove('add-popup_opened');
}

// EventListener
addButtonEl.addEventListener('click', openAddPopup);
closeAddPopupEl.addEventListener('click', closeAddPopup);

// Элементы попап просмотра фото

const photoPopupEl = document.querySelector('.photo-popup');
const photoEl = document.querySelector('.photo-popup__popup-photo');
const photoTitleEl = document.querySelector('.photo-popup__title');

function openPhoto(event) {
  const targetEl = event.target;
  const targetContaner = event.target.closest('.elements__item');
  const targetTitle = targetContaner.querySelector('.elements__text');
  // console.log(targetTitle);
  photoPopupEl.classList.add('photo-popup_opened');
  photoEl.src = targetEl.src;
  photoTitleEl.textContent = targetTitle.textContent;
}

const closePhotoPopupEl = document.querySelector('.photo-popup__close-button');

function closePhoto() {
  photoPopupEl.classList.remove('photo-popup_opened');
}

closePhotoPopupEl.addEventListener('click', closePhoto);

// Элементы добавления и удаления карточек
const cardsContanerEl = document.querySelector('.elements'); // Контейнер для добавления карточек
const templateCardEl = document.querySelector('.elements-item-template'); // Шаблон с html карточки

const newPlaceNameEl = document.querySelector('.add-popup__input_item_place-name');
const newPlaceLinkEl = document.querySelector('.add-popup__input_item_place-photo-link');
// console.log(newPlaceLinkEl, newPlaceNameEl);
function handleAdd(event) {
  event.preventDefault();
  const inputTitle = newPlaceNameEl.value;
  const inputImg = newPlaceLinkEl.value;
  const cardItem = addCard({name: inputTitle, link: inputImg, alt: inputTitle});

  cardsContanerEl.prepend(cardItem);
  newPlaceNameEl.value = '';
  newPlaceLinkEl.value = '';
  closeAddPopup();
}

// const addSubmitButton = document.querySelector('.add-popup__submit-button');
// addSubmitButton.addEventListener('click', handleAdd);
addFormEl.addEventListener('submit', handleAdd);

function addCard(card) { // Создает карточку
  const newCard = templateCardEl.content.cloneNode(true); // Объявил локальную переменную newCard и придал ей значение равное контенту в теге template = создал новую пустую карточку
  // Сослался на элементы в созданной карточке
  const cardTitle = newCard.querySelector('.elements__text');
  const cardImg = newCard.querySelector('.elements__photo');

  const deleteBtn = newCard.querySelector('.elements__delete-button');
  deleteBtn.addEventListener('click', deleteCard);

  const openPhotoEl = newCard.querySelector('.elements__photo');
  openPhotoEl.addEventListener('click', openPhoto);

  const LikeEl = newCard.querySelector('.elements__like-button');
  LikeEl.addEventListener('click', likePhoto);

  // Заполняю контентом новую карточку
  cardTitle.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.alt;

  return newCard; // Функция используется в методе .map, которому нужно возвращать элемент
}

function deleteCard(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.elements__item');

  targetItem.remove();
}

function likePhoto(event) {
  const targetEl = event.target;
  targetEl.classList.toggle('elements__like-button_active');

}

function initialRender() {
  const cards = initialCards // Объявил элемент cards, в который будут записываться данные после ремапа
      .map(addCard);

  cardsContanerEl.append(...cards); // И в метод append в качестве аргумента использую cards с опертором spread
}

initialRender();

