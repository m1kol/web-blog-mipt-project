import React from "react";

function Login() {
    return (
        <div className="Auth">
            <h2>Вход</h2>
            <form action='login' method='POST'>
                <span>Логин</span>
                <input type='text' required></input>
                <span>Пароль</span>
                <input type='text' required></input>
                <button>Войти</button>
                {/* <a>Забыли пароль?</a> */}
            </form>
        </div>
    )
}

export default Login