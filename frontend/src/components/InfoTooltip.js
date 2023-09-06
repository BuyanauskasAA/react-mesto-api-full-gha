import successImage from '../images/svg/tooltip-success.svg';
import failImage from '../images/svg/tooltip-fail.svg';

function InfoTooltip({ isOpened, onClose, isSuccess }) {
  function handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const text = isSuccess
    ? 'Вы успешно зарегистрировались!'
    : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <div onClick={handleOverlayClose} className={`popup ${isOpened ? 'popup_opened' : ''}`}>
      <div className="tooltip popup__container">
        <button
          onClick={onClose}
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
        ></button>
        <img
          src={isSuccess ? successImage : failImage}
          className="tooltip__image"
          alt="Регистрация"
        />
        <p className="tooltip__text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
