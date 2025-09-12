import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function EditProfileModal({
  activeModal,
  onClose,
  isOpen,
  onEditProfileModalSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);
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
          value={currentUser.name || ""}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="update-avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="update-avatar"
          value={currentUser.avatar || ""}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
