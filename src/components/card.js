import { openModal } from "./modal";
import { putLike, deleteLike, deleteCard } from './api'

const popupImageLink = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');

function createCard(name, link, alt, likes, ownerId, userId, cardId){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
    
    const countLikes = cardClone.querySelector('.card__like-count');
    const buttonLike = cardClone.querySelector('.card__like-button');
    const buttonDelete = cardClone.querySelector('.card__delete-button');

    cardClone.querySelector('.card__image').src = link;
    cardClone.querySelector('.card__image').alt = alt;
    cardClone.querySelector('.card__image').style.color = "white";
    cardClone.querySelector('.card__title').textContent = name;
    countLikes.textContent = likes.length;

    const likeAlready = (like) => {
        return like._id === userId;
    }

    if (Array.from(likes).some(likeAlready)) {
        buttonLike.classList.add('card__like-button_is-active');
    }

    buttonLike.addEventListener('click', function(evt) {
        if (!evt.target.classList.contains('card__like-button_is-active')) {
            putLike(cardId)
                .then((res) => {
                    evt.target.classList.add('card__like-button_is-active');
                    countLikes.textContent = res.likes.length;
                })
                .catch((err) => console.log(err))
        } else {
            deleteLike(cardId)
                .then((res) => {
                    evt.target.classList.remove('card__like-button_is-active');
                    countLikes.textContent = res.likes.length;
                })
                .catch((err) => console.log(err))
        }
    });

    if (ownerId !== userId) {
        buttonDelete.style.display = "none";
    }
    
    buttonDelete.addEventListener('click', function(evt) {
        evt.target.closest('.card').remove();
        deleteCard(cardId)
            .then(() => cardId)
            .catch((err) => console.log(err))

    });
    
    cardClone.querySelector('.card__image').addEventListener('click', function() {
        popupImageLink.src = link;
        popupImageName.textContent = name;
        popupImageLink.alt = name;
        openModal(imagePopup);
    });
    
    return cardClone;
}

export {createCard};