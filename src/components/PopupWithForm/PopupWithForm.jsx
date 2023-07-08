import closeIcon from "../../images/icon-close.svg";

  export default function PopupWithForm({name, title, buttonSave, children, isOpen, onClose }) {
    return (    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} >
    <div className="popup__container">
      <button
        type="button"
        className="popup__button-close"
        onClick={onClose}
      >
        <img
          className="popup__close"
          src={closeIcon}
          alt="крест"
        />
      </button>
      <form className="form" name="formPopup" noValidate="">
        <h2 className="form__caption">{title}</h2>
        {children}
        <button type="submit" className="form__button-save">
          {buttonSave}
        </button>
      </form>
    </div>
  </div>)
}