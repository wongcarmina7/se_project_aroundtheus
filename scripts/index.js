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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#modal-preview");
const overlayElement = document.querySelector(".modal__overlay");

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  //Attach events
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const trashButton = cardElement.querySelector(".card__trash-button");
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", (event) => {
    // Get the source of the clicked image

    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    imagePreviewTitle.textContent = cardData.name;

    // Open the modal by adding the class that makes it visible
    showPreview(previewImageModal);
  });

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function showPreview() {
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
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);

  cardTitleInput.value = "";
  cardUrlInput.value = "";
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

//add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});
