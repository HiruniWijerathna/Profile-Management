import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaPhotoVideo, 
 
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
