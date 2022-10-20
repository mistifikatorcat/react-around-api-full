import React from "react";
import tick from "../images/Tick.svg";
import cross from "../images/Cross.svg";

export default function InfoToolTip({ isOpen, onClose, status }) {
  const enable = `${isOpen ? "popup_enabled" : ""}`;
  return (
    <section className={`popup__tooltip popup ${enable}`}>
      <button className="popup__tooltip-close" onClick={onClose}></button>
      {status === "success" ? (
        <div className="popup__icon-wrapper">
          <img className="popup__icon" src={tick} alt="success" />
          <p className="popup__message">Success! You have been registered.</p>
        </div>
      ) : (
        <div className="popup__icon-wrapper">
          <img className="popup__icon" src={cross} alt="fail" />
          <p className="popup__message">
            Oops, something went wrong. Please try again.
          </p>
        </div>
      )}
    </section>
  );
}
