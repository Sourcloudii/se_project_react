import "./ModalWithForm.css";
// import closeBtn from "../../images/close.svg"

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garmet" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close-btn"
          aria-label="Close Modal"
        ></button>
        <form className="modal__form">{children}</form>
        <button type="button" className="modal__add-btn">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
