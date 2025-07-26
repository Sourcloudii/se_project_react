import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleOpenAddModal }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section-group">
        <p className="clothes-section_text">Your items</p>
        <button onClick={handleOpenAddModal} className="clothes-section-btn">+ Add New</button>
      </div>
      <ul className="cards__list clothes-section_cards-list">
        {clothingItems.map((item) => (
          <ItemCard item={item} key={item._id} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
