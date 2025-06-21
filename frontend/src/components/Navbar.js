// frontend/src/components/navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onFilter }) {
  const navigate = useNavigate();
  const categories = [
    'TIARA',
    'LAÇOS MINI/PP',
    'LAÇOS P',
    'LAÇOS M',
    'LAÇOS G',
    'PERSONALIZADOS'
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => onFilter(null)}>Laços</Link>
      <div className="nav-links">
        {categories.map((cat) => (
          <button
            key={cat}
            className="nav-button"
            onClick={() => {
              navigate('/');
              onFilter(cat);
            }}
          >
            {cat}
          </button>
        ))}
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
