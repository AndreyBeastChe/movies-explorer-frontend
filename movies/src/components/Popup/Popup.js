import "./Popup.css";

function Popup(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <form className="popup__container" noValidate onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        <button
          type="reset"
          onClick={props.onClose}
          className="popup__close-button"
        ></button>
        <button type="submit" className="popup__submit-button">
          {props.buttonName}
        </button>
      </form>
    </div>
  );
}

export default Popup;
