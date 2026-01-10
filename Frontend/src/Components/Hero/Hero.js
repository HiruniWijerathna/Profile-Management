import React from 'react'
import { Link } from 'react-router-dom';
import './Hero.css';


function Hero() {
  return (
    <div
      className="start-page"
      style={{ backgroundImage: `url(/herob.jpg)` }}
    >
      <div className="overlay">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Welcome to Sharefolio </h1>
        <h3>Where Files Meet Friends</h3>
        
        <Link to="/register" className='register'>Register</Link>
           
        <Link to="/login" className='login'>Login</Link>
            
        
      </div>
    </div>
  )
}

export default Hero
