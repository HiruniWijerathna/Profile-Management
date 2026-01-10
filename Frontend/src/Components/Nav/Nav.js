import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo1">Sharefolio</div>

      <ul className="nav-menu">
        <li>
          <Link to="/mainhome" className='active home'>Home</Link>
        </li>

        <li className="dropdown">
           <Link to="/settings" className='settings'>Peoples</Link>
        </li>
         <li className="dropdown">
            <Link to="" className="settings">
              <FaUserCircle size={22} />
            </Link>

            <ul className="dropdown-menu">
              <li>
                <Link to="/myprofile" className="update">View My Profile</Link>
              </li>
              <li>
                <Link to="/Profile" className="profile">Create Profile</Link>
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
