function closeByEsc(evt) {     
    if (evt.key === 'Escape') {       
        const openedPopup = document.querySelector('.popup_is-opened');   
        openedPopup.classList.remove('popup_is-opened');    
        closePopup(openedPopup);     
    }    
};

const isOverlay = (evt) => {
    if (evt.currentTarget === evt.target) {
        evt.target.classList.remove('popup_is-opened');
    } 
};

function openModal(popup) {  
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', isOverlay);
    document.addEventListener('keydown', closeByEsc)
    popup.addEventListener
};

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', isOverlay);
};

export {openModal, closeModal};