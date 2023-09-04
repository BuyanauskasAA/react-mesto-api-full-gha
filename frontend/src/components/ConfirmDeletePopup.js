import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpened, onClose, onConfirm, card, isLoading }) {
  function handleSubmit(event) {
    event.preventDefault();

    onConfirm(card);
  }

  const textButton = isLoading ? 'Удаление...' : 'Да';

  return (
    <PopupWithForm
      name="confirm-popup"
      title="Вы уверены?"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={textButton}
    />
  );
}

export default ConfirmDeletePopup;
