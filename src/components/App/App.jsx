import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import {
  getItems,
  postNewClothingItem,
  deleteClothingItem,
} from "../../utils/api.js";
import { setToken, getToken } from "../../utils/token.js";
import "./App.css";
import Header from "../Header/Header.jsx";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((response) => {
        const filteredData = filterWeatherData(response);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    auth
      .getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleOpenAddModal = () => {
    setActiveModal("add-garment");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    handleOpenModal("delete");
    setItemToDelete(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const jwt = getToken();
    postNewClothingItem({ name, imageUrl, weather }, jwt)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = (itemId) => {
    const jwt = getToken();
    deleteClothingItem(itemId, jwt)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setCurrentUser(data.user);
          setIsLoggedIn(true);
        }
      })
      .catch(console.error);
  };

  const handleRegisterModalSubmit = ({ name, password, email, avatarUrl }) => {
    auth
      .register(name, password, email, avatarUrl)
      .then((data) => {
        setToken(data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleEditProfileModalSubmit = ({ name, avatarUrl }) => {
    const jwt = getToken();
    auth
      .updateUserInfo({ name, avatarUrl }, jwt)
      .then((data) => {
        setCurrentUser(data);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogoutUser = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setToken("");
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const jwt = getToken();

    const apiCall = !isLiked ? api.likeItem : api.dislikeItem;

    apiCall(id, jwt)
      .then((res) => {
        const updatedCard = res.data;
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ handleToggleSwitchChange, currentTemperatureUnit }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleOpenAddModal={handleOpenAddModal}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      handleOpenEditProfileModal={handleOpenEditProfileModal}
                      handleOpenAddModal={handleOpenAddModal}
                      handleLogoutUser={handleLogoutUser}
                      currentUser={currentUser}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
            <AddItemModal
              activeModal={activeModal}
              isOpen={activeModal === "add-garment"}
              onClose={handleCloseModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              activeModal={activeModal}
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteClick={handleDeleteClick}
              currentUser={currentUser}
            />
            <DeleteItemModal
              onClose={handleCloseModal}
              isOpen={activeModal === "delete"}
              item={itemToDelete}
              onDelete={handleDeleteCard}
              contentClassName="modal__content_type_delete"
            />
            <RegisterModal
              activeModal={activeModal}
              setActiveModal={setActiveModal}
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegisterModalSubmit={handleRegisterModalSubmit}
            />
            <LoginModal
              activeModal={activeModal}
              setActiveModal={setActiveModal}
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLoginModalSubmit={handleLoginModalSubmit}
            />
            <EditProfileModal
              activeModal={activeModal}
              isOpen={activeModal === "edit-profile"}
              onClose={handleCloseModal}
              currentUser={currentUser}
              onEditProfileModalSubmit={handleEditProfileModalSubmit}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
