import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  const onName = (e) => {
    setName(e.target.value);
  };

  const onLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit({
      name: name,
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
          name="name"
          value={title}
          id="name"
          placeholder="Title"
          onChange={onName}
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
