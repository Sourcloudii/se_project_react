import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  contentClassName,
  altButtonText,
  onAltClick
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content ${contentClassName}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          aria-label="Close Modal"
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__btn_options">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
            <button type="button" onClick={onAltClick} className="modal__alt-btn">
              {altButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
