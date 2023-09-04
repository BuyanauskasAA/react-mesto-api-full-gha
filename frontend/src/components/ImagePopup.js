import React from 'react';

function ImagePopup({ card, onClose, isOpened }) {
  function handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleOverlayClose}
      className={`popup image-popup ${isOpened ? 'popup_opened' : ''}`}
    >
      <figure className="image-popup__container">
        <button
          onClick={onClose}
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
        ></button>
        <img className="image-popup__image" src={card && card.link} alt={card && card.name} />
        <figcaption className="image-popup__caption">{card && card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
