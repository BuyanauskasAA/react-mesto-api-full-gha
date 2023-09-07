class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(path, options) {
    return fetch(`${this._baseUrl}/${path}`, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards() {
    return this._request('cards', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this._request(`cards/${cardId}/likes`, {
      method: method,
      credentials: 'include',
      headers: this._headers,
    });
  }

  addCard(body) {
    return this._request('cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(body),
    });
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request('users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  setUserInfo(body) {
    return this._request('users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(body),
    });
  }

  setUserAvatar(body) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(body),
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
