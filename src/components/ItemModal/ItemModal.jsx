import "./ItemModal.css";

function ItemModal({ activeModal, selectedCard, onClose }) {


  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={onClose}
          className="modal__close-btn modal__preview-close-btn"
          aria-label="Close Modal"
        ></button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__preview-img"
        />
        <div className="modal__preview-content">
          <h2 className="modal__preview-title">{selectedCard.name}</h2>
          <p className="modal__preview-weather">
            Weather: {selectedCard.weather}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
