import "./Profile.css";
import ClothesSection from "./ClothesSection.jsx";
import SideBar from "./SideBar.jsx";

export default function Profile({
  onCardClick,
  onCardLike,
  clothingItems,
  handleOpenAddModal,
  handleOpenEditProfileModal,
  currentUser,
  handleLogoutUser,
}) {
  return (
    <div className="profile">
      <section>
        <SideBar
          currentUser={currentUser}
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
          currentUser={currentUser}
        />
      </section>
    </div>
  );
}
