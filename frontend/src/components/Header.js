import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const { pathname } = useLocation();

  return (
    <header className="header page__header">
      <Link className="logo header__logo" to="/" />
      <div className="header__container">
        {pathname === '/sign-in' && (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}
        {pathname === '/sign-up' && (
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        )}
        {pathname === '/' && (
          <>
            <p className="header__email">{email}</p>
            <p onClick={onSignOut} className="header__link header__link_dimed" to="/">
              Выйти
            </p>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
