export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = null;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashIcon();
      });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._imageElement = this._cardElement.querySelector(".card__image");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleTrashIcon() {
    console.log("Trash button clicked");
    this._cardElement.remove();
  }
}
