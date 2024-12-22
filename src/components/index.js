import { enableValidation } from "./validate";
import { openModal, closeModal } from "./modal";
import { createCard } from "./card";
import { uploadingProfile, uploadingCards, editProfile, createNewCard, editImagePhoto } from "./api";
import '../pages/index.css';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editImageProfilePopup = document.querySelector('.popup_type_edit-image');
const editImageProfilePopupContent = editImageProfilePopup.querySelector('.popup__content');
editImageProfilePopupContent.style.minHeight = "202px";

const popupButtonEditProfile = document.querySelector('.profile__edit-button');
const popupButtonAddCard = document.querySelector('.profile__add-button');
const popupButtonEditProfileImage = document.querySelector('.profile__image')

const popupButtonCloseEditProfile = document.querySelector('.popup_type_edit .popup__close');
const popupButtonCloseAddCard = document.querySelector('.popup_type_new-card .popup__close');
const popupButtonCloseImage = document.querySelector('.popup_type_image .popup__close');
const popupButtonCloseEditImage = document.querySelector('.popup_type_edit-image .popup__close');

const profileFormElement = document.querySelector('[name="edit-profile"]');
const popupProfileInputName = document.querySelector('.popup__input_type_name');
const popupProfileInputDescription = document.querySelector('.popup__input_type_description');
const profileSaveButton = profileFormElement.querySelector('.popup__button')

const cardFormElement = document.querySelector('[name="new-place"]');
const popupCardInputName = document.querySelector('.popup__input_type_card-name');
const popupCardInputLink = document.querySelector('.popup__input_type_url');
const cardSaveButton = cardFormElement.querySelector('.popup__button')

const editImageFormElement = document.querySelector('[name="edit-image"]')
const popupEditImageProfileInput = document.querySelector('.popup__input_type_image-url')
const editImageProfileSvaeButton = editImageFormElement.querySelector('.popup__button')

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')

const placesList = document.querySelector('.places__list');

function renderLoading(isLoading, buttonSubmit) {
  if (isLoading) {
    buttonSubmit.textContent = 'Сохранение...';
  } else {
    buttonSubmit.textContent = 'Сохранение';
  }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, profileSaveButton);
    editProfile(popupProfileInputName.value, popupProfileInputDescription.value)
      .then(() => {
        profileName.textContent = popupProfileInputName.value;
        profileDescription.textContent = popupProfileInputDescription.value;
        closeModal(profilePopup);
      })
      .catch((err) => console.log(err))
      .finally(() => renderLoading(false, profileSaveButton));
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, cardSaveButton)
    createNewCard(popupCardInputName.value, popupCardInputLink.value)
    .then(() => {
      placesList.prepend(
        createCard(popupCardInputName.value, popupCardInputLink.value, popupCardInputName.value, []));
      closeModal(cardPopup);
      popupCardInputName.value = '';
      popupCardInputLink.value = '';
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, cardSaveButton))
}

function handleProfileImageFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editImageProfileSvaeButton);
  editImagePhoto(popupEditImageProfileInput.value)
    .then(() => {
      popupButtonEditProfileImage.style.backgroundImage = `url(${popupEditImageProfileInput.value})`;
      closeModal(editImageProfilePopup);
      popupEditImageProfileInput.value = '';
    })
    .catch((err) => console.log(err))
    .finally(() => 
      renderLoading(false, editImageProfileSvaeButton))
}

popupButtonAddCard.addEventListener('click', () => {
    openModal(cardPopup);
    const button = cardFormElement.querySelector('.popup__button');
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_inactive');
});

popupButtonEditProfile.addEventListener('click', function () {
    openModal(profilePopup);
    const button = profileFormElement.querySelector('.popup__button');
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_inactive');
    popupProfileInputName.value = profileName.textContent;
    popupProfileInputDescription.value = profileDescription.textContent;
});

popupButtonEditProfileImage.addEventListener('click', function () {
  openModal(editImageProfilePopup);
})

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
editImageProfilePopup.classList.add('popup_is-animated');

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardFormElement.addEventListener('submit', handleCardFormSubmit); 
editImageFormElement.addEventListener('submit', handleProfileImageFormSubmit)

popupButtonCloseEditProfile.addEventListener('click', () => closeModal(profilePopup));
popupButtonCloseAddCard.addEventListener('click', () => closeModal(cardPopup));
popupButtonCloseImage.addEventListener('click', () => closeModal(imagePopup));
popupButtonCloseEditImage.addEventListener('click', () => closeModal(editImageProfilePopup))

//validation//

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(validationSettings);

//api

uploadingProfile()
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileImage.style.backgroundImage = `url(${res.avatar})`
  })
  .catch((err) => console.log(err));


uploadingCards()
  .then((res) => {
    uploadingProfile()
        .then((user) => {
          res.forEach(card => {
            placesList.append(createCard(
              card.name,
              card.link,
              card.name, 
              card.likes,
              card.owner._id,
              user._id,
              card._id
              ));
      })});
  })
  .catch((err) => console.log(err));