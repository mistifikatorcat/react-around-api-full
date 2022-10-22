let node_env = 'production';

/*let BASE_URL = 
node_env === 'production'
? 'https://api.danielevgrafov.students.nomoredomainssbs.ru/'
: 'http://localhost:3000';*/

let BASE_URL =
node_env === 'production'
? 'http://localhost:3001'
: 'http://localhost:3001';

const fetcher = (url, headers) => {
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.StatusText)
  );
};

export const register = (email, password) => {
  return fetcher(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const login = (email, password) => {
  return fetcher(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("email", email);
    return data;
  });
};

export const checkTokenValidity = (token) => {
  return fetcher(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
