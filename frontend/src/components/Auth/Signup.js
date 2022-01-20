import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from "../Menu/Menu";
import './Auth.scss'

function Signup({ isLoggedIn, updateLogin }) {
    let navigate = useNavigate()

    const [isLoginErrShown, setLoginErrShown] = useState(false)
    const [isPasswErrShown, setPasswShown] = useState(false)

    let onChangeLogin = (event) => {
        setLoginErrShown(false)
    }

    let onChangePassword = (event) => {
        setPasswShown(false)
    }

    let submitForm = async (event) => {
        event.preventDefault()
        let user = event.target['login'].value
        let email = event.target['email'].value
        let password = event.target['password'].value
        let password2 = event.target['password2'].value

        if (password !== password2) {
            setPasswShown(true)
        }
        else {
            let response = await fetch(
                '/register',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `username=${user}&email=${email}&password=${password}`,
                }
            )

            if (response.ok) {
                updateLogin(user)
                navigate(`/profile/${user}`)
            }
            else if (response.status == 409) {
                setLoginErrShown(true)
            }
        }
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn} updateLogin={updateLogin}/>
            <div className="Auth">
                <h2>Регистрация</h2>
                <form onSubmit={submitForm}>
                    {isLoginErrShown && <div className='wrong_auth'>Пользователь с данным логином уже существует</div>}
                    {isPasswErrShown && <div className='wrong_auth'>Пароли не совпадают</div>}
                    <span>Введите логин</span>
                    <input type='text' name='login' onChange={onChangeLogin} required></input>
                    <span>Введите адрес электронной почты</span>
                    <input type='email' name='email' required></input>
                    <span>Введите пароль</span>
                    <input type='password' name='password' onChange={onChangePassword} required></input>
                    <span>Введите пароль повторно</span>
                    <input type='password' name='password2' onChange={onChangePassword} required></input>
                    <button type='submit'>Зарегистрироваться</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Signup