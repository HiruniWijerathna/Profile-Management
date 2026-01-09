import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>

      <ul className="nav-menu">
        <li>
          <Link to="/mainhome" className='active home'>Home</Link>
        </li>

         <li className="profile">
          <Link to="/profiles" className='profile'>Profiles</Link>
        </li>

        <li className="logout">
          <Link to="/hero" className='logout'>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
