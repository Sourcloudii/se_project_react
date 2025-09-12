import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function EditProfileModal({
  activeModal,
  onClose,
  isOpen,
  onEditProfileModalSubmit,
  currentUser,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileModalSubmit({ name, avatar });
    setName("");
    setAvatar("");
  };

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change profile data"
      activeModal={activeModal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="update-name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="update-name"
          value={name || ""}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="update-avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="update-avatar"
          value={avatar || ""}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
