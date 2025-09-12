import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function SideBar({
  handleOpenEditProfileModal,
  handleLogoutUser,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user_info">
        {currentUser?.avatar ? (
          <img
            className="header__avatar"
            src={currentUser.avatar}
            alt="Profile picture"
          />
        ) : (
          <div className="header__avatar-palceholder">
            {currentUser?.name?.[0]?.toUpperCase() || ""}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <div className="sidebar__user_options">
        <button
          onClick={handleOpenEditProfileModal}
          className="sidebar__update_profile-btn"
        >
          Change Profile Data
        </button>
        <button
          type="button"
          onClick={handleLogoutUser}
          className="sidebar_logout-btn"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
