import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Header({
  handleOpenAddModal,
  weatherData,
  handleRegisterModal,
  handleLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleOpenAddModal}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name || "User"}</p>
              {currentUser?.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="profile picture"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.[0]?.toUpperCase() || ""}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterModal}
            type="button"
            className="header__register-btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginModal}
            type="button"
            className="header__login-btn"
          >
            Log in
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
