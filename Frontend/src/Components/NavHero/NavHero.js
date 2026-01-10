import React from 'react';
import './NavHero.css';
import { Link } from 'react-router-dom';

function NavHero() {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>

      <ul className="nav-menu">
        <li>
          <Link to="/mainhero" className='active home'>Home</Link>
        </li>

        <li className="dropdown">
          Create Account
      
          <ul className="dropdown-menu">
            <li>
             <Link to="/register" className='register'>Register</Link>
            </li>
            <li>
              <Link to="/login" className='login'>Login</Link>
            </li>
            
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavHero;
