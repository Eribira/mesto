// Код сгруппирован по принципу:
// Dom элементы и const для фичи
// Function для нее же
// Связанные обработчики

// Универсальная функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Универсальная функция для закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function setOverlayClose(popup) {
  popup.addEventListener('click', () => {
    closePopup(popup);
  });
};

function enableOverlayClose() {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popup) => {
    setOverlayClose(popup);
  })
};

enableOverlayClose();

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
  openPopup(editPopupEl);
  nameInputEl.value = profileNameEl.textContent;
  captureInputEl.value = profileCaptureEl.textContent; // Эти две строки передают исходный текст с открывшуюся форму
};

// Edit submit
function editSubmitHandler(evt) {
  evt.preventDefault();
  
  profileNameEl.textContent = nameInputEl.value; // value для input - это содерживое строки ввода
  profileCaptureEl.textContent = captureInputEl.value; // При помощи textContent перезаписывается на страницу то что сейчас введено в input

  closePopup(editPopupEl);
};

// EventListener
editButtonEl.addEventListener('click', openEditPopup); // For open
editFormEl.addEventListener('submit', editSubmitHandler); // For edit submit
closeEditPopupEl.addEventListener('click', () => {closePopup(editPopupEl)}); // For close

// ADD POPUP
// Popup Element
const addPopupEl = document.querySelector('.add-popup'); // Popup
const closeAddPopupEl = document.querySelector('.add-popup__close-button'); // Close button
const addFormEl = document.querySelector('.add-popup__contaner'); // Add form Element

const addButtonEl = document.querySelector('.profile__add-button'); // Open button

// EventListener
addButtonEl.addEventListener('click', () => {openPopup(addPopupEl)}); // Open
closeAddPopupEl.addEventListener('click', () => {closePopup(addPopupEl)}); // Close

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

  openPopup(photoPopupEl);
  photoEl.src = targetEl.src;
  photoTitleEl.textContent = targetTitle.textContent;
};

// EventListener
closePhotoPopupEl.addEventListener('click', () => {closePopup(photoPopupEl)});

// GET, ADD AND DELETE CARDS

const cardsContanerEl = document.querySelector('.elements'); // Контейнер для добавления карточек
const templateCardEl = document.querySelector('.elements-item-template'); // Шаблон с html карточки
// Popup
const newPlaceNameEl = document.querySelector('.add-popup__input_item_place-name'); // Input El for Place name
const newPlaceLinkEl = document.querySelector('.add-popup__input_item_place-photo-link'); // Input El for Photo's Title

// Get card
function createCard(card) { // Создает карточку
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
};

// Handle add
function handleAddCard(event) {
  event.preventDefault();
  const inputTitle = newPlaceNameEl.value;
  const inputImg = newPlaceLinkEl.value;
  const cardItem = createCard({name: inputTitle, link: inputImg, alt: inputTitle}); // Передаю функции createCard объект с ключами, которые распознает функция

  cardsContanerEl.prepend(cardItem);
  newPlaceNameEl.value = '';
  newPlaceLinkEl.value = ''; // Очистил значения строк ввода
  closeAddPopup();
};

// Delete
function deleteCard(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.elements__item');

  targetItem.remove();
};

// EventListener
addFormEl.addEventListener('submit', handleAddCard);

// Like photo
function likePhoto(event) {
  const targetEl = event.target;
  targetEl.classList.toggle('elements__like-button_active');
};

function renderInitialCards() {
  const cards = initialCards // Объявил элемент cards, в который будут записываться данные после ремапа
      .map(createCard);

  cardsContanerEl.append(...cards); // И в метод append в качестве аргумента использую cards с опертором spread
};

renderInitialCards();

