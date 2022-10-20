import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit({
      title: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          name="title"
          value={title}
          id="title"
          placeholder="Title"
          onChange={onTitle}
          required
          minLength="1"
          maxLength="30"
        />
        <span className="form__input-error title-error"></span>
        <input
          className="form__input"
          type="url"
          id="link"
          placeholder="Image Link"
          name="link"
          value={link}
          onChange={onLink}
          required
        />
        <span className="form__input-error link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
