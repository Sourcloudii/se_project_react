import "./Profile.css";
import ClothesSection from "./ClothesSection.jsx";
import SideBar from "./SideBar.jsx";

export default function Profile({
  onCardClick,
  onCardLike,
  clothingItems,
  handleOpenAddModal,
  handleOpenEditProfileModal,
  handleLogoutUser,
}) {
  return (
    <div className="profile">
      <section>
        <SideBar
          handleOpenEditProfileModal={handleOpenEditProfileModal}
          handleLogoutUser={handleLogoutUser}
        />
      </section>
      <section>
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}
          handleOpenAddModal={handleOpenAddModal}
        />
      </section>
    </div>
  );
}
