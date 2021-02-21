const showInputError = (inputElement, errorMessage) => {
  // console.log(inputElement, errorMessage);
  const formSectionElement = inputElement.closest(".popup__fieldset");
  const errorElement = formSectionElement.querySelector(".popup__error");

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (inputElement) => {
  const formSectionElement = inputElement.closest(".popup__fieldset");
  const errorElement = formSectionElement.querySelector(".popup__error");

  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
};

const checkInputValidity = (inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorMessage = inputElement.validationMessage;

  if (isInputNotValid) {
    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
};

const setEventListeners = (formSelector, inputSelector) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formSelector.addEventListener("submit", handleFormSubmit);

  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
    })
  })
};

const enableValidation = ({ formSelector, inputSelector }) => {
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements);

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