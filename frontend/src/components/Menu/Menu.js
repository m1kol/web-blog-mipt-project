import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

function Menu({ isLoggedIn }) {
  const loginLinks = {'Войти': '/login', 'Зарегистрироваться': '/signup'}

  function logout() {
    return true
  }

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
      <div className="auth_links">
        <ul>
        {!isLoggedIn ? 
          Object.keys(loginLinks).map((key, index) => (
            <li key={`nav-li-${index}`}>
              <NavLink to={loginLinks[key]} className="menu-link">
                {key}
              </NavLink>
            </li>
          )) : (
            <li>
              <NavLink to="/logout" className="menu-link" onClick={logout}>
                Выйти
              </NavLink>
            </li>
        )}
        </ul>
      </div>
    </nav>
  )
}

export default Menu;