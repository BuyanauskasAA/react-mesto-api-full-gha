import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  const cardList = cards.map((card) => (
    <li className="card" key={card._id}>
      <Card
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </li>
  ));

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={avatar} alt="Аватар" />
          <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__edit-container">
            <h1 className="profile__name">{name}</h1>
            <button
              onClick={onEditProfile}
              className="button profile__edit-button"
              type="button"
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__about">{about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="button profile__add-button"
          type="button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="cards content__cards">
        <ul className="cards__container">{cardList}</ul>
      </section>
    </main>
  );
}

export default Main;
