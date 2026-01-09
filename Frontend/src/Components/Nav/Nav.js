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

        <li className="dropdown">
          Settings
          <ul className="dropdown-menu">
            <li>
             <Link to="/profile" className='profile'>Profile</Link>
            </li>
            <li>
              <Link to="/update" className='update'>Update Account</Link>
            </li>
            <li>
              <Link to="/delete" className='delete'>Delete Account</Link>
            </li>
          </ul>
        </li>

        <li className="logout">
          <Link to="/hero" className='logout'>Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
