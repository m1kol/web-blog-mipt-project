import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import RecentPosts from './components/RecentPosts/RecentPosts';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Article from './components/Article/Article';
import './App.scss';

function App() {
  const [login, setLogin] = useState(false)

  let isLoggedIn = async () => {
    let response = await fetch('/is_logged_in')
    let json = await response.json()
    return json.is_logged_in ? json.username : json.is_logged_in
  }

  useEffect(async () => {
    let login = await isLoggedIn()
    setLogin(login)
  }, [])

  let updateLogin = (newLogin) => {
    setLogin(newLogin)
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecentPosts isLoggedIn={login} updateLogin={updateLogin}/>} />
        <Route path="/profile/:user" element={<Profile isLoggedIn={login} updateLogin={updateLogin}/>} />
        <Route path="/article/:id" element={<Article isLoggedIn={login} updateLogin={updateLogin}/>}/>
        <Route path="/login" element={<Login isLoggedIn={login} updateLogin={updateLogin}/>} />
        <Route path="/signup" element={<Signup isLoggedIn={login}  updateLogin={updateLogin}/>} />
        <Route path="/logout" element={<RecentPosts isLoggedIn={login} updateLogin={updateLogin}/>} />
        <Route path="*" element={<RecentPosts isLoggedIn={login} updateLogin={updateLogin}/>} />
      </Routes>
    </div>
  )
}

export default App;