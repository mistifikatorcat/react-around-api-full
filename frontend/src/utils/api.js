export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _respond(res) {
      res.ok
        ? res.json()
        : Promise.reject(`Something went wrong: ${res.status}`)
    ;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(this._respond);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
        body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._respond);
  }

  editProfilePic(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._respond);;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(this._respond);
  }

  createCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
        body: JSON.stringify({name, link}),
    }).then(this._respond);
  }

  changeLikeCardStatus(cardId, liked) {
    if (!liked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}/likes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._respond);;
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }).then(this._respond);;
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._respond);;
  }
}

//initializing api


let node_env = 'production';

let baseUrl = 
node_env === 'production'
? 'https://api.danielevgrafov.students.nomoredomainssbs.ru'
: 'https://danielevgrafov.students.nomoredomainssbs.ru';


//let baseUrl = 'https://api.danielevgrafov.students.nomoredomainssbs.ru';


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
