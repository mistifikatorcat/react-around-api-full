import React from "react";
export default function PopupWithForm(props) {
  const enable = `${props.isOpen ? "popup_enabled" : ""}`;
  return (
    <section className={`${props.name} popup ${enable}`} id={`${props.name}`}>
      <div className={`${props.name}__container`}>
        <button
          className={`popup__close ${props.name}__close`}
          onClick={props.onClose}
        ></button>
        <div className={`${props.name}__form`}>
          <h3 className={`${props.name}__title`}>{props.title}</h3>
          <form
            className="form popup__form"
            id={`${props.name}Form`}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <fieldset className="form__fieldset">
              <button className="form__button" type="submit">
                Save
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
}
