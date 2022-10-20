import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const { name } = props.card;
  const currentUser = React.useContext(CurrentUserContext);

  function handleImageClick() {
    props.onCardClick(props.card);
  }

  function handleLikeCLick() {
    props.onLikeClick(props.card);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  }

  // Checking if the current user is the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_enabled" : ""
  }`;

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="grid__card">
      <div className="card">
        <div
          className="card__image"
          style={{
            backgroundImage: `url(${props.card.link})`,
          }}
          onClick={handleImageClick}
        />
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        />
        <div className="card__info">
          <h3 className="card__title">{name}</h3>
          <div className="card__like">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeCLick}
              type="button"
            ></button>
            <h4 className="card__like-counter">{props.card.likes.length}</h4>
          </div>
        </div>
      </div>
    </li>
  );
}
