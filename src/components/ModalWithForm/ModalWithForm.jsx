import "./ModalWithForm.css";
// import closeBtn from "../../images/close.svg"

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          aria-label="Close Modal"
        />
        <form className="modal__form">
          {children}
          <button type="button" className="modal__add-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
