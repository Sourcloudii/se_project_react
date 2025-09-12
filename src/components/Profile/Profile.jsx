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
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          handleOpenEditProfileModal={handleOpenEditProfileModal}
          handleLogoutUser={handleLogoutUser}
        />
      </section>
      <section className="profile__clothes">
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
