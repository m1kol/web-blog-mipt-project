import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from "../Menu/Menu";
import './Auth.scss'

function Login({ isLoggedIn }) {
    let navigate = useNavigate()

    const [isErrorShown, setErrorShown] = useState(false)

    function onChangeInputs(event) {
        setErrorShown(false)
    }

    async function submitForm(event) {
        event.preventDefault()
        let user = event.target['login'].value
        let password = event.target['password'].value

        navigate(`/profile/${user}`)

        // let response = await fetch(
        //     '/login',
        //     {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //         body: `user=${user}&password=${password}`,
        //     }
        // )
    }

    return (
        <React.Fragment>
            <Menu isLoggedIn={isLoggedIn}/>
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