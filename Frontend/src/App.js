import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Hero from './Components/Hero/Hero';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import DeleteProfile from './Components/DeleteProfile/DeleteProfile';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/delete" element={<DeleteProfile />} />
        <Route path="/hero" element={<Hero />} />
      </Routes>
    </div>
  );
}

export default App;
