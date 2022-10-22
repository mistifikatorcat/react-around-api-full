let baseUrl = 'http://localhost:3001';
export class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _respond(res) {
      res.ok
        ? res.json()
        : Promise.reject(`Something went wrong: ${res.status}`)
    ;
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(this._respond);
  }

  setUserInfo({name, about}, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
        body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._respond);
  }

  editProfilePic(url, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._respond);;
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(this._respond);
  }

  createCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
        body: JSON.stringify(data),
    }).then(this._respond);
  }

  changeLikeCardStatus(id, liked, token) {
    if (!liked) {
      return fetch(`${this._baseUrl}/cards/likes/${id}/likes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }).then(this._respond);;
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }).then(this._respond);;
    }
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then(this._respond);;
  }
}

//initializing api


let node_env = 'production';

/*let baseUrl = 
node_env === 'production'
? 'https://api.danielevgrafov.students.nomoredomainssbs.ru/'
: 'http://danielevgrafov.students.nomoredomainssbs.ru';
*/

 


const api = new Api({
 baseUrl
});

export default api;


/*const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "b451294b-44d9-464a-8874-2d4137a4eb3c",
    "Content-Type": "application/json",
  },
});

export default api;
*/
