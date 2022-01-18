import React, { useState } from "react";
import Menu from "../Menu/Menu";
import './Auth.scss'

function Signup({ isLoggedIn }) {
    const [isLoginErrShown, setLoginErrShown] = useState(false)
    const [isPasswErrShown, setPasswShown] = useState(false)

    function onChangeLogin(event) {
        setLoginErrShown(false)
    }

    function onChangePassword(event) {
        setPasswShown(false)
    }

    function submitForm(event) {
        console.log(event)
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="Auth">
                <h2>Регистрация</h2>
                <form onSubmit={submitForm}>
                    {isLoginErrShown && <div className='wrong_auth'>Пользователь с данным логином уже существует</div>}
                    {isPasswErrShown && <div className='wrong_auth'>Пароли не совпадают</div>}
                    <span>Введите логин</span>
                    <input type='text' onChange={onChangeLogin} required></input>
                    <span>Введите пароль</span>
                    <input type='password' onChange={onChangePassword} required></input>
                    <span>Введите пароль повторно</span>
                    <input type='password' onChange={onChangePassword} required></input>
                    <button type='submit'>Зарегистрироваться</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Signup