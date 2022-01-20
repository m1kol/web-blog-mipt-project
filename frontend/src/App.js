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

  let isLoggedIn = () => {
    // let response = await fetch('/isLoggedIn')
    // let text = await response.text()
    // return text //возвращает false или userName
    return 'kate'
  }

  useEffect(async () => {
    let login = await isLoggedIn()
    setLogin(login)
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecentPosts isLoggedIn={login}/>} />
        <Route path="/profile/:user" element={<Profile isLoggedIn={login}/>} />
        <Route path="/article/:id" element={<Article isLoggedIn={login}/>}/>
        <Route path="/login" element={<Login isLoggedIn={login}/>} />
        <Route path="/signup" element={<Signup isLoggedIn={login}/>} />
        <Route path="/logout" element={<RecentPosts isLoggedIn={login}/>} />
        <Route path="*" element={<RecentPosts isLoggedIn={login}/>} />
      </Routes>
    </div>
  )
}

export default App;