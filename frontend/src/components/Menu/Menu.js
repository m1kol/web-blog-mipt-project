import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Menu.scss';

function Menu({ isLoggedIn, updateLogin }) {
  const loginLinks = {'Войти': '/login', 'Зарегистрироваться': '/signup'}
  let navigate = useNavigate()

  let logout = async () => {
    let response = await fetch('/logout')
    if (response.ok) {
      updateLogin(false)
      navigate('/')
    }
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