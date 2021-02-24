// const config = {
//   formSelector: '.popup__form',
//   formSectionSelector: '.popup__fieldset',
//   inputSelector: '.popup__input',
//   errorMessegeSelector: '.popup__error',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// };
// Далее вместо селекторов я обращаюсь к obj.name, что позволит один раз сменить селектор внутри объекта и легко переиспользовать код
// Возможно такой объект тоже стоит вынести в отдельный файл с данными

const showInputError = (inputElement, errorMessage, config) => {
  // console.log(inputElement, errorMessage);
  const formSectionElement = inputElement.closest(config.formSectionSelector); // Нахожу нужную форму
  const errorElement = formSectionElement.querySelector(config.errorMessegeSelector); // Нахожу нужный span

  // console.log(formSectionElement);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (inputElement, config) => {
  const formSectionElement = inputElement.closest(config.formSectionSelector); // Нахожу нужную форму
  const errorElement = formSectionElement.querySelector(config.errorMessegeSelector); // Нахожу нужный span

  errorElement.textContent = " "; // Хорошая практика - очищать поля и значения, когда они больше не нужны
  errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid; // = инпут не валиден
  const errorMessage = inputElement.validationMessage; // Текс ошибок берем из стандартных браузерных ошибок

  // console.log(config);

  if (isInputNotValid) { // Если инпут не валиден
    showInputError(inputElement, errorMessage, config); // Показываем ошибку
  } else { // Иначе
    hideInputError(inputElement, config); // Скрываем
  }
};

const toggleButtonState = (buttonElement, inputList, config) => {
  const findinvalidInput = (inputElement) => !inputElement.validity.valid; // Если validity = false, то findinvalidInput будет возвращать true
  const hasNotValidInput = inputList.some(findinvalidInput); // И при проходе методом some возврат true выполнит условия if

  // console.log(config);

  if (hasNotValidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formSelector, inputSelector, config) => {
  // console.log(config);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formSelector.addEventListener("submit", handleFormSubmit); // Вешаем отмену отправки форм на сервер

  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(config.submitButtonSelector); // Сделали список всех инпутов внутри формы
  // console.log(buttonElement);
  
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => { // Прошлись методом forEach и повесили на каждое действие input проверку валидности и смену статуса кнопок сабмита
      checkInputValidity(inputElement, config);
      toggleButtonState (buttonElement, inputList, config);
    })
  })

  toggleButtonState (buttonElement, inputList, config); // Проверка статуса кнопок при инициализации
};

const enableValidation = (config) => {
  const formElements = document.querySelectorAll(config.formSelector);
  const formList = Array.from(formElements); // Создали список всех форм и навесили на них обработчики

  // console.log(config);

  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config);
  });
};

enableValidation({
  formSelector: '.popup__form',
  formSectionSelector: '.popup__fieldset',
  inputSelector: '.popup__input',
  errorMessegeSelector: '.popup__error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});