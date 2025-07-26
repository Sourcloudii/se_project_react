import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext.js";
import {
  getItems,
  postNewClothingItem,
  deleteClothingItem,
} from "../../utils/api.js";
import "./App.css";
import Header from "../Header/Header.jsx";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal.jsx";

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

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((response) => {
        const filteredData = filterWeatherData(response);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleOpenAddModal = () => {
    setActiveModal("add-garment");
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

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
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    handleOpenModal("delete");
    setItemToDelete(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    postNewClothingItem({ name, imageUrl, weather })
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = (itemId) => {
    deleteClothingItem(itemId)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        handleCloseModal();
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ handleToggleSwitchChange, currentTemperatureUnit }}
    >
      <div className="page">
        <div className="page__content">
          <Header weatherData={weatherData} handleOpenAddModal={handleOpenAddModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleOpenAddModal={handleOpenAddModal}
                />
              }
            />
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
          />
          <DeleteItemModal
            onClose={handleCloseModal}
            isOpen={activeModal === "delete"}
            item={itemToDelete}
            onDelete={handleDeleteCard}
            contentClassName="modal__content_type_delete"
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
