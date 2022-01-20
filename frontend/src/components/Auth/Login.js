import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from "../Menu/Menu";
import './Auth.scss'

function Login({ isLoggedIn, updateLogin }) {
    let navigate = useNavigate()

    const [isErrorShown, setErrorShown] = useState(false)

    let onChangeInputs = (event) => {
        setErrorShown(false)
    }

    let submitForm = async (event) => {
        event.preventDefault()
        let user = event.target['login'].value
        let password = event.target['password'].value

        let response = await fetch(
            '/login',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${user}&password=${password}`,
            }
        )

        if (response.ok) {
            updateLogin(user)
            navigate(`/profile/${user}`)
        }
        else setErrorShown(true)
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn} updateLogin={updateLogin}/>
            <div className="Auth">
                <h2>Вход</h2>
                <form onSubmit={submitForm}>
                    {isErrorShown && <div className='wrong_auth'>Неверные логин или пароль</div>}
                    <span>Логин</span>
                    <input type='text' name='login' onChange={onChangeInputs} required></input>
                    <span>Пароль</span>
                    <input type='password' name='password' onChange={onChangeInputs} required></input>
                    <button type='submit'>Войти</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login