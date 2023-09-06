import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpened, onClose, onAddPlace, isLoading }) {
  const name = React.useRef();
  const link = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({ name: name.current.value, link: link.current.value });
  }

  React.useEffect(() => {
    name.current.value = '';
    link.current.value = '';
  }, [isOpened]);

  const textButton = isLoading ? 'Сохранение...' : 'Создать';

  return (
    <PopupWithForm
      name="card-popup"
      title="Новое место"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={textButton}
    >
      <>
        <label className="form__field">
          <input
            id="input-card-name"
            className="form__input form__input_color_black"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            ref={name}
          />
          <span className="form__error input-card-name-error"></span>
        </label>
        <label className="form__field">
          <input
            id="input-card-link"
            className="form__input form__input_color_black"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            ref={link}
          />
          <span className="form__error input-card-link-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
