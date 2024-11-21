const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popupButtonEditProfile = document.querySelector('.profile__edit-button');
const popupButtonAddCard = document.querySelector('.profile__add-button');
const popupButtonImage = document.querySelector('.popup_type_image');

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

const popupImageLink = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__caption');

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function openModal(popup) {  
    popup.classList.add('popup_is-opened');
};

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
};

function createCard(element){
    const cardClone = cardTemplate.cloneNode(true);
    const imageCardLink = cardClone.querySelector('.card__image');
    const nameCard = cardClone.querySelector('.card__title');
    const buttonLike = cardClone.querySelector('.card__like-button');
    const buttonDelete = cardClone.querySelector('.card__delete-button');

    imageCardLink.src = element.link;
    imageCardLink.alt = element.alt;
    nameCard.textContent = element.name;

    buttonDelete.addEventListener('click', function() {
        deleteCardConteiner = buttonDelete.closest('.card');
        deleteCardConteiner.remove();
    });

    buttonLike.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    });
    
    imageCardLink.addEventListener('click', function() {
        popupImageLink.src = element.link;
        popupImageName.textContent = element.name;
        popupImageLink.alt = 'Новое добавленное место';
        openModal(imagePopup);
    });
    
    return placesList.prepend(cardClone);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupProfileInputName.value;
    profileDescription.textContent = popupProfileInputDescription.value;
    closeModal(profilePopup)
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    cardValues = {name : popupCardInputName.value, link : popupCardInputLink.value}
    createCard(cardValues);
    closeModal(cardPopup);
    popupCardInputName.value = '';
    popupCardInputLink.value = '';
}

initialCards.forEach((item) => createCard(item));

popupButtonAddCard.addEventListener('click', () => openModal(cardPopup));

popupButtonCloseEditProfile.addEventListener('click', () => closeModal(profilePopup));
popupButtonCloseAddCard.addEventListener('click', () => closeModal(cardPopup));
popupButtonCloseImage.addEventListener('click', () => closeModal(imagePopup));

popupButtonEditProfile.addEventListener('click', function () {
    openModal(profilePopup);
    popupProfileInputName.value = profileName.textContent;
    popupProfileInputDescription.value = profileDescription.textContent;
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 
cardFormElement.addEventListener('submit', handleCardFormSubmit); 


