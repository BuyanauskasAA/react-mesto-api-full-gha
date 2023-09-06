import React from 'react';
import validationConfig from '../utils/validation-config';
import FormValidator from '../utils/FormValidator';

function PopupWithForm({ name, title, children, isOpened, onClose, onSubmit, textButton }) {
  const form = React.useRef();

  function handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  React.useEffect(() => {
    const formValidator = new FormValidator(validationConfig, form.current);
    formValidator.enableValidation();

    if (form.current.name === 'confirm-popup') {
      formValidator.enableSubmitButton();
    }
  }, [isOpened]);

  return (
    <div onClick={handleOverlayClose} className={`popup ${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form ref={form} onSubmit={onSubmit} className="form" name={name} noValidate>
          {children}
          <button
            className="button form__submit-button form__submit-button_color_black"
            type="submit"
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
