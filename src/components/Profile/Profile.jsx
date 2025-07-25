import "./Profile.css";
import ClothesSection from "./ClothesSection.jsx";
import SideBar from "./SideBar.jsx";

export default function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems}/>
      </section>
    </div>
  );
}
