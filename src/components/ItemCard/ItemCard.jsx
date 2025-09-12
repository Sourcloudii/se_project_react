import "./ItemCard.css";
import likedHeart from "../../images/liked-heart.svg";
import unlikedHeart from "../../images/unliked-heart.svg";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isOwn = item?.owner === currentUser?._id;
  const isLiked = item.likes.some(id => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card__item">
      <img
        onClick={handleCardClick}
        className="card__img"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__overlay">
        <h2 className="card__name">{item.name}</h2>
        <button
          type="button"
          className="card__like-btn"
          aria-label="Like Button"
          onClick={handleCardLike}
        >
          {!isOwn && item.owner !== "system" && (
            <img
              src={isLiked ? likedHeart : unlikedHeart}
              alt="like icon"
            />
          )}
        </button>
      </div>
    </li>
  );
}

export default ItemCard;
