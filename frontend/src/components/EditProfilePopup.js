import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpened, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  const textButton = isLoading ? 'Сохранение...' : 'Сохранить';

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={textButton}
    >
      <>
        <label className="form__field">
          <input
            id="input-profile-name"
            className="form__input form__input_color_black"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="form__error input-profile-name-error"></span>
        </label>
        <label className="form__field">
          <input
            id="input-profile-about"
            className="form__input form__input_color_black"
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="form__error input-profile-about-error"></span>
        </label>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
