import "./ItemModal.css";

function ItemModal({
  activeModal,
  selectedCard,
  onClose,
  onDeleteClick,
  currentUser,
}) {
  const isOwn = selectedCard?.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={onClose}
          className="modal__close-btn modal__preview-close-btn"
          aria-label="Close Modal"
        ></button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__preview-img"
        />
        <div className="modal__preview-content">
          <h2 className="modal__preview-title">
            {selectedCard.name}
            {isOwn && selectedCard.owner !== "system" && (
              <button
                onClick={() => onDeleteClick(selectedCard)}
                type="button"
                className="modal__preview-delete-btn"
              >
                Delete item
              </button>
            )}
          </h2>
          <p className="modal__preview-weather">
            Weather: {selectedCard.weather}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
