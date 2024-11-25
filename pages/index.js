import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#modal-preview");
const editForm = document.querySelector("#edit-profile-form");
const addForm = document.querySelector("#add-card-form");

/* -------------------------------------------------------------------------- */
/*                                  Buttons & Dom Nodes                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const cardsWrap = document.querySelector(".cards__list");
const profileModalCloseButton = profileEditModal.querySelector("#modal-close");
const addCardModalCloseButton = addCardModal.querySelector("#modal-close");
const profileDescription = document.querySelector(".profile__description");
const previewModalCloseButton =
  previewImageModal.querySelector(".modal__close");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const imagePreviewTitle = previewImageModal.querySelector(".modal__title");
const previewImage = previewImageModal.querySelector(".modal__image");
/* -------------------------------------------------------------------------- */
/*                                  Form Data                                  */
/* -------------------------------------------------------------------------- */
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                  */
/* -------------------------------------------------------------------------- */
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleOverlayEsc);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleOverlayEsc);
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

function handleOverlayEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function createCard(data) {
  return new Card(data, "#card-template").getView();
}

// function Card(cardData) {
//   const cardTemplate = document.querySelector("#card-template").content;
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");

//   cardImageEl.src = cardData.image;
//   cardTitleEl.textContent = cardData.title;

//   // Attach events
//   const likeButton = cardElement.querySelector(".card__like-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   const trashButton = cardElement.querySelector(".card__trash-button");
//   trashButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;

//   cardImageEl.addEventListener("click", () => {
//     updateImagePreview(
//       cardData,
//       previewImage,
//       imagePreviewTitle,
//       previewImageModal
//     );
//   });

//   return cardElement;
// }

function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card);
}

function updateImagePreview(
  cardData,
  previewImage,
  imagePreviewTitle,
  previewImageModal
) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  imagePreviewTitle.textContent = cardData.name;

  showPreview(previewImageModal);
}

function showPreview(previewImageModal) {
  openModal(previewImageModal);
}

/* -------------------------------------------------------------------------- */
/*                                  Event Handlers                                  */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  renderCard(
    { name: cardTitleInput.value, link: cardUrlInput.value },
    cardsWrap
  );
  closeModal(addCardModal);

  addCardFormElement.reset();
}

/* -------------------------------------------------------------------------- */
/*                                  Event Listeners                                  */
/* -------------------------------------------------------------------------- */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

//Validation

const validationSettings = {
  inputSelector: ".modal__input",
  buttonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator({
  settings: validationSettings,
  formElement: editForm,
});

editFormValidator.enableValidation();

const addFormValidator = new FormValidator({
  settings: validationSettings,
  formElement: addForm,
});

addFormValidator.enableValidation();
