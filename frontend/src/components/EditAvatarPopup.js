import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar, isLoading }) {
  const avatar = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  React.useEffect(() => {
    avatar.current.value = '';
  }, [isOpened]);

  const textButton = isLoading ? 'Сохранение...' : 'Сохранить';

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={textButton}
    >
      <label className="form__field">
        <input
          id="input-avatar-link"
          className="form__input form__input_color_black"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatar}
        />
        <span className="form__error input-avatar-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
