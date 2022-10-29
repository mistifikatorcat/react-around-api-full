import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false,
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "email@mail.com" });
  const [isCheckingToken, setIsCheckingToken] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState("");
  //const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  const history = useHistory();

  //getting info from the server

  //getting user info

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .getUserInfo(token)
        .then(res => {
          console.log('getting user info ', res);
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //getting card info

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .getInitialCards(token)
        .then((res) => {
          console.log('getting card info ', res);
          setCards(res.data); //|| []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //checking token

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkTokenValidity(token)
        .then((res) => {
          console.log('checking token ', res);
          if (res.data._id) { //(res._id)
            setIsLoggedIn(true);
            setUserData({ email: res.data.email });
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => {
          console.log(err);
          history.push("/signin");
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    }
  }, []);

  //close by esc

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  //event handlers

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImageClick(card) {
    setSelectedCard({
      ...selectedCard,
      visibility: true,
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      visibility: false,
    });
    setIsInfoToolTipOpen(false);
  }

  //like card handler

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    const token = localStorage.getItem('jwt');
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._cardId, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._cardId === card._cardId ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //delete card handler

  function handleCardDelete(card) {
    api
      .deleteCard(card._cardId)
      .then(() => {
        const updatedCards = cards.filter((currentCard) => {
          return currentCard._cardId !== card._cardId;
        });
        setCards(updatedCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //updating user info

  function handleUpdateUser({name, about}) {
    //const token = localStorage.getItem('jwt');
    api
      .setUserInfo({name, about}) //token)
      .then((res) => {
        console.log('frontend app handleUpdateUser, worked')
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('frontend app handleUpdateUser, didnt work')
        console.log(err);
      });
  }

  //updating profile pic

  function handleUpdateAvatar({avatar}) {
    //const token = localStorage.getItem('jwt');
    api
      .editProfilePic(avatar)
      .then((res) => {
        console.log('frontend app handleUpdateAvatar, worked')

        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('frontend app handleUpdateAvatar, didnt work')

        console.log(err);
      });
  }

  //uploading a new card

  function handleAddPlaceSubmit({name, link}) {
    //const token = localStorage.getItem('jwt');
    api
      .createCard({name, link})
      .then(res => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //register a new user

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) { //(res._id)
          setIsSuccess("success");
          history.push("/signin");
          console.log('user added')
        } else {
          setIsSuccess("fail");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('user not added')
        setIsSuccess("fail");
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setUserData({ email });
          setCurrentUser(res.user);
          localStorage.setItem('jwt', res.token);
          //setToken(res.token);
          history.push("/");
        } else {
          setIsSuccess("fail");
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess("fail");
        setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }

  function signout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        email={userData.email}
        signout={signout}
      />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          isLoggedIn={isLoggedIn}
          isCheckingToken={isCheckingToken}
        >
          <Main
            /*event handlers go here*/
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleImageClick}
            onLikeClick={handleCardLike}
            onDeleteClick={handleCardDelete}
            cardsArray={cards}
          >
            <EditAvatarPopup
              /*form parameters*/
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </Main>
        </ProtectedRoute>

        <Route path={"/signup"}>
          <Register handleRegister={handleRegister} />
        </Route>

        <Route path={"/signin"}>
          <Login handleLogin={handleLogin} />
        </Route>

        <Route>
          {isLoggedIn ? <Redirect to={"/"} /> : <Redirect to={"/signin"} />}
        </Route>
      </Switch>
      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        status={isSuccess}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
