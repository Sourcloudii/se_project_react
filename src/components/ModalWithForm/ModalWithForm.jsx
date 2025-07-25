import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  contentClassName,
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
          <button type="submit" className="modal__add-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
