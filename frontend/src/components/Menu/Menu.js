import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

function Menu({ isLoggedIn }) {
  return (
    <nav className="Menu">
      <div className="main_links">
        <ul>
          <li>
            <NavLink to="/" className="menu-link">
              Главная
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to={`/profile/${isLoggedIn}`} className="menu-link">
                Личный профиль
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {!isLoggedIn && (
        <div className="auth_links">
          <ul>
            <li>
              <NavLink to="/login" className="menu-link">
                Войти
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="menu-link">
                Зарегистрироваться
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Menu;