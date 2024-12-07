import { enableValidation } from "./validate";
import { openModal, closeModal } from "./modal";
import { initialCards } from "./cards";
import { createCard } from "./card";
import '../pages/index.css';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popupButtonEditProfile = document.querySelector('.profile__edit-button');
const popupButtonAddCard = document.querySelector('.profile__add-button');

const popupButtonCloseEditProfile = document.querySelector('.popup_type_edit .popup__close');
const popupButtonCloseAddCard = document.querySelector('.popup_type_new-card .popup__close');
const popupButtonCloseImage = document.querySelector('.popup_type_image .popup__close');

const profileFormElement = document.querySelector('[name="edit-profile"]');
const popupProfileInputName = document.querySelector('.popup__input_type_name');
const popupProfileInputDescription = document.querySelector('.popup__input_type_description');

const cardFormElement = document.querySelector('[name="new-place"]');
const popupCardInputName = document.querySelector('.popup__input_type_card-name');
const popupCardInputLink = document.querySelector('.popup__input_type_url');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    closeModal(profilePopup)
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardValues = {name : popupCardInputName.value, link : popupCardInputLink.value}
    createCard(cardValues);
    closeModal(cardPopup);
    popupCardInputName.value = '';
    popupCardInputLink.value = '';
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


profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

initialCards.forEach((item) => createCard(item));

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardFormElement.addEventListener('submit', handleCardFormSubmit); 

popupButtonCloseEditProfile.addEventListener('click', () => closeModal(profilePopup));
popupButtonCloseAddCard.addEventListener('click', () => closeModal(cardPopup));
popupButtonCloseImage.addEventListener('click', () => closeModal(imagePopup));

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


