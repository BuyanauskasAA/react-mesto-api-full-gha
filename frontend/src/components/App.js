import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupopen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const [isSuccessTooltip, setSuccessTooltip] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        setUserEmail(response.email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards.reverse());
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isImagePopupOpen ||
      isConfirmPopupOpen ||
      isTooltipOpen
    ) {
      document.addEventListener('keydown', handleEscapeClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isImagePopupOpen,
    isConfirmPopupOpen,
    isTooltipOpen,
  ]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleConfirmClick(card) {
    setSelectedCard(card);
    setConfirmPopupopen(true);
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setSuccessTooltip(true);
        setTooltipOpen(true);
      })
      .catch((error) => {
        setSuccessTooltip(false);
        setTooltipOpen(true);
        console.error(error);
      });
  }

  function handleAuthorize(password, email) {
    auth
      .authorize(password, email)
      .then(() => {
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleUpdateUser(userInfo) {
    setLoading(true);
    api
      .setUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setLoading(true);
    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupopen(false);
    setTimeout(() => {
      setSelectedCard({});
    }, 250);
  }

  function closeTooltip() {
    setTooltipOpen(false);
    if (isSuccessTooltip) {
      navigate('/sign-in', { replace: true });
    }
  }

  function handleSignOut() {
    auth
      .logout()
      .then(() => {
        setUserEmail('');
        navigate('/sign-in', { replace: true });
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={userEmail} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmClick}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/sign-in" element={<Login onSubmit={handleAuthorize} />} />
          <Route path="/sign-up" element={<Register onSubmit={handleRegister} />} />
        </Routes>

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmDeletePopup
          card={selectedCard}
          isOpened={isConfirmPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onConfirm={handleCardDelete}
        />

        <ImagePopup card={selectedCard} isOpened={isImagePopupOpen} onClose={closeAllPopups} />

        <InfoTooltip isOpened={isTooltipOpen} onClose={closeTooltip} isSuccess={isSuccessTooltip} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
