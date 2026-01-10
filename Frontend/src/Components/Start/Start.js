import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';

function Start() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/hero');
  };

  return (
    <div
      className="start-page"
      style={{ backgroundImage: `url(/startb.jpg)` }}
    >
      <div className="overlay">
        <img src="/logo.png" alt="Logo" className="llogo" />
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Start;
