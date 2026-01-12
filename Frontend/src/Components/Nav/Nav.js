import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaPhotoVideo, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo1">Sharefolio</div>

      <ul className="nav-menu">
        {/* Home */}
        <li>
          <Link to="/mainhome" className="nav-icon">
            <FaHome size={25} title="Home" />
          </Link>
        </li>

        {/* Peoples */}
        <li>
          <Link to="/settings" className="nav-icon">
            <FaUsers size={25} title="Peoples" />
          </Link>
        </li>

        {/* Photos */}
        <li>
          <Link to="/all-images" className="nav-icon">
            <FaPhotoVideo size={25} title="Photos" />
          </Link>
        </li>

        {/* User Dropdown */}
        <li className="dropdown">
          <Link to="#" className="nav-icon">
            <FaUserCircle size={25} title="User Menu" />
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/myprofile">View My Profile</Link>
            </li>
            <li>
              <Link to="/Profile">Create Profile</Link>
            </li>
            <li>
              <Link to="/imageuplode">Upload Image</Link>
            </li>
          </ul>
        </li>

        {/* Logout */}
        <li>
          <Link to="/hero" className="nav-icon">
            <FaSignOutAlt size={25} title="Logout" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
