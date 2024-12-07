import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popupImageLink = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');

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
        const deleteCardConteiner = buttonDelete.closest('.card');
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

export {createCard};