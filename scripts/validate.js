const showInputError = (inputElement, errorMessage) => {
  // console.log(inputElement, errorMessage);
  const formSectionElement = inputElement.closest(".popup__fieldset"); // Нахожу нужную форму
  const errorElement = formSectionElement.querySelector(".popup__error"); // Нахожу нужный span

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (inputElement) => {
  const formSectionElement = inputElement.closest(".popup__fieldset"); // Нахожу нужную форму
  const errorElement = formSectionElement.querySelector(".popup__error"); // Нахожу нужный span

  errorElement.textContent = " "; // Хорошая практика - очищать поля и значения, когда они больше не нужны
  errorElement.classList.remove("popup__error_visible");
};

const checkInputValidity = (inputElement) => {
  const isInputNotValid = !inputElement.validity.valid; // = инпут не валиден
  const errorMessage = inputElement.validationMessage; // Текс ошибок берем из стандартных браузерных ошибок

  if (isInputNotValid) { // Если инпут не валиден
    showInputError(inputElement, errorMessage); // Показываем ошибку
  } else { // Иначе
    hideInputError(inputElement); // Скрываем
  }
};

const toggleButtonState = (buttonElement, inputList) => {
  const findinvalidInput = (inputElement) => !inputElement.validity.valid; // Если validity = false, то findinvalidInput будет возвращать true
  const hasNotValidInput = inputList.some(findinvalidInput); // И при проходе методом some возврат true выполнит условия if

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__button_disabled");
  }
};

const setEventListeners = (formSelector, inputSelector) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formSelector.addEventListener("submit", handleFormSubmit); // Вешаем отмену отправки форм на сервер

  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(".popup__button"); // Сделали список всех инпутов внутри формы
  // console.log(buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => { // Прошлись методом forEach и повесили на каждое действие input проверку валидности и смену статуса кнопок сабмита
      checkInputValidity(inputElement);
      toggleButtonState (buttonElement, inputList);
    })
  })

  toggleButtonState (buttonElement, inputList); // Проверка статуса кнопок при инициализации
};

const enableValidation = ({ formSelector, inputSelector }) => {
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements); // Создали список всех форм и навесили на них обработчики

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});