const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }
  
  const errorShow = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
    const errorHeight = errorElement.scrollHeight;
    if (errorHeight > 44) {
        errorElement.style.position = 'relative';
    }
  };
  
  const errorHide = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        errorShow(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        errorHide(formElement, inputElement, validationSettings);
    }
  };
  
  const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonSave = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonSave, validationSettings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonSave, validationSettings);
        });
    });
  };
  
  const hasNotValid = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }
  
  const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasNotValid(inputList)){
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
  }
  
  function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationSettings);
    });
  };
  
  export {enableValidation};