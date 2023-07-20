class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }

  // Cоздание карточек с сервера

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.status,
      }),
    }).then(this._checkRes);
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarlink,
      }),
    }).then(this._checkRes);
  }

  createNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.placename,
        link: data.placelink,
      }),
    }).then(this._checkRes);
  }

  //   лайк карточки
  changeLikeCardStatus(cardId, isLike) {
    let method = "DELETE";
    if (isLike) {
      method = "PUT";
    }
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }

  // addLike(cardId, isLike) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: "PUT",
  //     headers: {
  //       authorization: this._authorization,
  //     },
  //   }).then(this._checkRes);
  // }

  // deleteLike(cardId, isLike) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: this._authorization,
  //     },
  //   }).then(this._checkRes);
  // }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkRes);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "b6c4512c-817a-42b9-b0f0-214f2963b61f",
    "Content-Type": "application/json",
  },
});

export default api;
