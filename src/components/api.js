const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
      authorization: '726f09ca-3c43-4314-bbb3-8224d3993082',
      'Content-Type': 'application/json'
    }
  }

export const uploadingProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
  
      return Promise.reject(`Ошибка ${res.status}`)
      })
}

export const uploadingCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
    
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

export const editProfile = (nameInput, descriptionInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: nameInput,
        about: descriptionInput
      })
    })
    .then((res) => {
        if (res.ok){
          return res.json()
        }
    
        return Promise.reject(`Ошибка ${res.status}`)
      })
}

export const createNewCard = (titleCard, linkCard) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: titleCard,
        link: linkCard
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
  
      return Promise.reject(`Ошибка ${res.status}`)
    })
  }
  
export const editImagePhoto = (linkImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body : JSON.stringify({
            avatar: linkImage
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка ${res.status}`)
    })
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
    })
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers:  config.headers,
    })

    .then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
    })
}
