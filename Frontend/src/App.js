import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Hero from './Components/Hero/Hero';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import DeleteProfile from './Components/DeleteProfile/DeleteProfile';
import Settings from './Components/Settings/Settings';

function App() {
  return (
    <div className="App">
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete" element={<DeleteProfile />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/:id" element={<UpdateProfile/>} />
      </Routes>
    </div>
  );
}

export default App;
