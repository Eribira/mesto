
const initialCards = [ // Массив с объектами для карточек
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

// Код сгруппирован по принципу:
// Dom элементы и const для фичи
// Function для нее же
// Связанные обработчики


// EDIT POPUP
// Popup elements
const editPopupEl = document.querySelector('.edit-popup'); // Popup
const closeEditPopupEl = document.querySelector('.edit-popup__close-button'); // Close button

const editButtonEl = document.querySelector('.profile__edit-button'); // Edit button
const editFormEl = document.querySelector('.edit-popup__contaner'); // Edit form Element
const nameInputEl = document.querySelector('.edit-popup__input_item_name'); // Input Element for name
const captureInputEl = document.querySelector('.edit-popup__input_item_capture'); // Input Element for caption or job

// HTML Element in Profile Section
const profileNameEl = document.querySelector('.profile__name');
const profileCaptureEl = document.querySelector('.profile__capture');

// Open popup
function openEditPopup() {
  editPopupEl.classList.add('edit-popup_opened'); // Метод classList.add добавляет модификатор, раскрывая оверлей с попапом
  nameInputEl.value = profileNameEl.textContent;
  captureInputEl.value = profileCaptureEl.textContent; // Эти две строки передают исходный текст с открывшуюся форму
}

// Edit submit
function editSubmitHandler(evt) {
  evt.preventDefault();
  
  profileNameEl.textContent = nameInputEl.value; // value для input - это содерживое строки ввода
  profileCaptureEl.textContent = captureInputEl.value; // При помощи textContent перезаписывается на страницу то что сейчас введено в input

  closeEditPopup()
  }

// Close popup
function closeEditPopup() {
  editPopupEl.classList.remove('edit-popup_opened');
}

// EventListener
editButtonEl.addEventListener('click', openEditPopup); // For open
editFormEl.addEventListener('submit', editSubmitHandler); // For edit submit
closeEditPopupEl.addEventListener('click', closeEditPopup); // For close




// ADD POPUP
// Popup Element
const addPopupEl = document.querySelector('.add-popup'); // Popup
const closeAddPopupEl = document.querySelector('.add-popup__close-button'); // Close button
const addFormEl = document.querySelector('.add-popup__contaner'); // Add form Element

const addButtonEl = document.querySelector('.profile__add-button'); // Open button

// Open popup
function openAddPopup() {
  addPopupEl.classList.add('add-popup_opened');
}

// Close popup
function closeAddPopup() {
  addPopupEl.classList.remove('add-popup_opened');
}

// EventListener
addButtonEl.addEventListener('click', openAddPopup); // Open
closeAddPopupEl.addEventListener('click', closeAddPopup); // Close




// PHOTO VIEW POPUP
// Popup
const photoPopupEl = document.querySelector('.photo-popup'); // Popup
const photoEl = document.querySelector('.photo-popup__popup-photo'); // Img El
const photoTitleEl = document.querySelector('.photo-popup__title'); // Title for photo
const closePhotoPopupEl = document.querySelector('.photo-popup__close-button'); // Close button

// Open view
function openPhoto(event) {
  const targetEl = event.target;
  const targetContaner = event.target.closest('.elements__item');
  const targetTitle = targetContaner.querySelector('.elements__text');

  photoPopupEl.classList.add('photo-popup_opened');
  photoEl.src = targetEl.src;
  photoTitleEl.textContent = targetTitle.textContent;
}

// Close view
function closePhoto() {
  photoPopupEl.classList.remove('photo-popup_opened');
}

// EventListener
closePhotoPopupEl.addEventListener('click', closePhoto);




// GET, ADD AND DELETE CARDS

const cardsContanerEl = document.querySelector('.elements'); // Контейнер для добавления карточек
const templateCardEl = document.querySelector('.elements-item-template'); // Шаблон с html карточки
// Popup
const newPlaceNameEl = document.querySelector('.add-popup__input_item_place-name'); // Input El for Place name
const newPlaceLinkEl = document.querySelector('.add-popup__input_item_place-photo-link'); // Input El for Photo's Title

// Get card
function addCard(card) { // Создает карточку
  const newCard = templateCardEl.content.cloneNode(true); // Объявил локальную переменную newCard и придал ей значение равное контенту в теге template = создал новую пустую карточку
  // Сослался на элементы в созданной карточке
  const cardTitle = newCard.querySelector('.elements__text');
  const cardImg = newCard.querySelector('.elements__photo');

  // Ссылаюсь на элементы в созданной карточке и создаю на них же обработчики, так как элементы созданы при помощи js
  // и нужно ссылаться на них сразу при создании
  const deleteBtn = newCard.querySelector('.elements__delete-button'); // Delete button on card
  deleteBtn.addEventListener('click', deleteCard);

  const openPhotoEl = newCard.querySelector('.elements__photo'); // Img Element on card
  openPhotoEl.addEventListener('click', openPhoto);

  const LikeEl = newCard.querySelector('.elements__like-button'); // Like button on card
  LikeEl.addEventListener('click', likePhoto);

  // Заполняю контентом новую карточку, используя ключи, как в объекте массива.
  cardTitle.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.alt;

  return newCard; // Функция используется в методе .map, которому нужно возвращать элемент
}

// Handle add
function handleAdd(event) {
  event.preventDefault();
  const inputTitle = newPlaceNameEl.value;
  const inputImg = newPlaceLinkEl.value;
  const cardItem = addCard({name: inputTitle, link: inputImg, alt: inputTitle}); // Передаю функции addCard объект с ключами, которые распознает функция

  cardsContanerEl.prepend(cardItem);
  newPlaceNameEl.value = '';
  newPlaceLinkEl.value = ''; // Очистил значения строк ввода
  closeAddPopup();
}

// Delete
function deleteCard(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.elements__item');

  targetItem.remove();
}

// EventListener
addFormEl.addEventListener('submit', handleAdd);



// Like photo
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

