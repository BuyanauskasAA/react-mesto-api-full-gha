import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <>
      {isOwn && (
        <button
          onClick={handleDelete}
          className="button card__delete-button"
          type="button"
          aria-label="Удалить"
        />
      )}
      <img onClick={handleClick} className="card__image" src={card.link} alt={card.name} />
      <div className="card__title-section">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            onClick={handleLike}
            className={`button card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
            type="button"
            aria-label="Лайк"
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
