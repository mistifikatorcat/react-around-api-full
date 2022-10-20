import React from "react";
export default function ImagePopup(props) {
  const enable = `${props.card.visibility ? "popup_enabled" : ""}`;
  return (
    <section className={`image popup ${enable}`} id="image">
      <div className="image__wrapper">
        <button
          className="popup__close image__close"
          onClick={props.onClose}
        ></button>
        <img
          className="image__file"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="image__title">{props.card ? props.card.name : ""}</p>
      </div>
    </section>
  );
}
