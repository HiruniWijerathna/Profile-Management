import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Hero from './Components/Hero/Hero';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import DeleteProfile from './Components/DeleteProfile/DeleteProfile';
import Settings from './Components/Settings/Settings';
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import MyProfile from './Components/MyProfile/MyProfile'
import View from './Components/View/View'
import Start from './Components/Start/Start'
import ImageUplode from './Components/ImageUplode/ImageUplode'
import AllImages from './Components/AllImages/AllImages'
import SearchImages from './Components/SearchImages/SearchImages'
import ViewImage from "./Components/viewImage/viewImage";
import UploadImageEdit from './Components/UploadImageEdit/UploadImageEdit';


function App() {
  return (
    <div className="App">

      <Routes>
        
         <Route path="/" element={<Start />} />
         <Route path="/hero" element={<Hero />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete" element={<DeleteProfile />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/:id" element={<UpdateProfile/>} />
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/view/:id" element={<View />} />
        <Route path="/imageuplode" element={<ImageUplode />} />
          <Route path="/all-images" element={<AllImages />} />
          <Route path="/search-images" element={<SearchImages />} />
          <Route path="/view-images/:userEmail" element={<ViewImage />} />
         <Route path="/all-images/:id" element={<UploadImageEdit />} />




        <Route path="/mainhero" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </div>
  );
}

export default App;
