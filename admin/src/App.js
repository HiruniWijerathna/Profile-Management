import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profiles from './Component/Profiles/Profiles';
import UpdateProfile from './Component/UpdateProfile/UpdateProfile';
import React from 'react';
import Home from './Component/Home/Home';


function App() {
  return (
    <div className="App">
     
     <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/profiles" element={<Profiles />} />
         <Route path="/profiles/:id" element={<UpdateProfile />} />
     </Routes>
    </div>
  );
}

export default App;
