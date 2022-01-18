import React, { useState } from "react";
import Menu from "../Menu/Menu";
import './Auth.scss'

function Login({ isLoggedIn }) {
    const [isErrorShown, setErrorShown] = useState(false)

    function onChangeInputs(event) {
        setErrorShown(false)
    }

    function submitForm(event) {

    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
            <div className="Auth">
                <h2>Вход</h2>
                <form onSubmit={submitForm}>
                    {isErrorShown && <div className='wrong_auth'>Неверные логин или пароль</div>}
                    <span>Логин</span>
                    <input type='text' onChange={onChangeInputs} required></input>
                    <span>Пароль</span>
                    <input type='password' onChange={onChangeInputs} required></input>
                    <button type='submit'>Войти</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login