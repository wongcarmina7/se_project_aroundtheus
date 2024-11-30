class FormValidator {
  constructor({ settings, formElement }) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._buttonSelector = settings.buttonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(this._buttonSelector);
  }

  _showInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  resetValidation() {
    this._toggleButtonState();

    if (this._inputList && Array.isArray(this._inputList)) {
      this._inputList.forEach((inputElement) => {
        this._hideError(inputElement);
      });
    } else {
      console.error("Error: _inputList is not defined or not an array");
    }
  }

  _toggleButtonState() {
    const isValid = this._inputList.every((input) => input.validity.valid);
    if (isValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    }
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(this._buttonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  buttonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formElement = document.querySelector(".modal__form");

const formValidator = new FormValidator({
  settings: settings,
  formElement: formElement,
});

formValidator.enableValidation();
export default FormValidator;
