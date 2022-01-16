import React from 'react';
import { Routes, Route} from 'react-router-dom';
import RecentPosts from './components/RecentPosts/RecentPosts';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Article from './components/Article/Article';
import './App.scss';

let userName = 'kate'

function App() {
  let isLoggedIn = () => {
    return 'kate' //возвращает false или userName
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecentPosts isLoggedIn={isLoggedIn()}/>} />
        <Route path="/profile/:user" element={<Profile isLoggedIn={isLoggedIn()}/>} />
        <Route path="/article/:id" element={<Article isLoggedIn={isLoggedIn()}/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<RecentPosts isLoggedIn={isLoggedIn()}/>} />
      </Routes>
    </div>
  )
}

export default App;