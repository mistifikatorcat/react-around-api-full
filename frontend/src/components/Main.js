import React from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__card">
            <div className="profile__picture-wrapper">
              <img
                className="profile__picture"
                alt="Profile Picture"
                src={currentUser.avatar}
              />
              <div
                className="profile__picture-overlay"
                onClick={props.onEditAvatarClick}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                aria-label="edit"
                type="button"
                onClick={props.onEditProfileClick}
              ></button>
              <p className="profile__category">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            aria-label="add"
            type="button"
            onClick={props.onAddPlaceClick}
          ></button>
        </div>
      </section>
      {props.children}
      <section className="grid">
        <ul className="grid__cards">
          {props.cardsArray && props.cardsArray.map((card) => (
            <Card
              key={card._cardId}
              card={card}
              onCardClick={props.onCardClick}
              onLikeClick={props.onLikeClick}
              onDeleteClick={props.onDeleteClick}
            />
          )
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
