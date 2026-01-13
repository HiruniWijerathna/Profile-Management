import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';

import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import DeleteProfile from './Components/DeleteProfile/DeleteProfile';
import Settings from './Components/Settings/Settings';
import MyProfile from './Components/MyProfile/MyProfile'
import View from './Components/View/View'

import ImageUplode from './Components/ImageUplode/ImageUplode'
import AllImages from './Components/AllImages/AllImages'
import SearchImages from './Components/SearchImages/SearchImages'
import ViewImage from "./Components/viewImage/viewImage";
import UploadImageEdit from './Components/UploadImageEdit/UploadImageEdit';
import SendPdf from './Components/SendPdf/SendPdf';
import AllPdf from './Components/AllPdf/AllPdf';


function App() {
  return (
    <div className="App">

      <Routes>
        
         
       <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete" element={<DeleteProfile />} />
        
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/:id" element={<UpdateProfile/>} />
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/view/:id" element={<View />} />
        <Route path="/imageuplode" element={<ImageUplode />} />
        <Route path="/all-images" element={<AllImages />} />
        <Route path="/search-images" element={<SearchImages />} />
        <Route path="/view-images/:userEmail" element={<ViewImage />} />
        <Route path="/all-images/:id" element={<UploadImageEdit />} />
        <Route path="/sendpdf" element={<SendPdf />} />
        <Route path="/all-pdf" element={<AllPdf />} />
        <Route path="/view-image/:email" element={<ViewImage />} />






       


      </Routes>
    </div>
  );
}

export default App;
