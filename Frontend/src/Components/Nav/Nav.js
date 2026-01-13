import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaPhotoVideo, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaFilePdf 
} from "react-icons/fa";

function Nav() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo1">Sharefolio</div>

      {/* Navigation Menu */}
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

        {/* PDFs */}
        <li>
          <Link to="/all-pdf" className="nav-icon">
            <FaFilePdf size={22} title="PDFs" />
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
            <li>
              <Link to="/sendpdf">Upload PDF</Link>
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
