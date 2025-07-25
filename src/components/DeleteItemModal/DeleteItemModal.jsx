import "./DeleteItemModal.css";

export default function DeleteItemModal({
  isOpen,
  item,
  onClose,
  onDelete,
  contentClassName = "modal__content_type_delete",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(item._id);
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_delete">
        <p className="modal__delete-text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          onClick={handleSubmit}
          type="submit"
          className="modal__delete-btn"
        >
          Yes, delete item
        </button>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
          aria-label="Close Modal"
        ></button>
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__cancel-btn_type_delete"
          aria-label="Close Modal"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
