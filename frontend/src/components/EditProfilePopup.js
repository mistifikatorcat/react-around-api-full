import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props, isOpen) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name || "");
  const [description, setDescription] = React.useState(
    currentUser.description || ""
  );

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Edit Profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          id="name"
          placeholder="Name"
          required
          value={name}
          onChange={onNameChange}
        />
        <span className="form__input-error name-error"></span>
        <input
          className="form__input"
          type="text"
          id="category"
          placeholder="About me"
          value={description}
          onChange={onDescChange}
        />
        <span className="form__input-error category-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
