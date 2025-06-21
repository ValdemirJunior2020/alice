import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  return (
    <nav
      style={{
        backgroundColor: '#ffc0cb',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2 style={{ margin: 0, fontWeight: 'bold', color: '#d63384' }}>
        🎀 Alice Acessórios
      </h2>

      <div>
        <Link
          to="/"
          style={{
            marginRight: '20px',
            color: location.pathname === '/' ? '#fff' : '#d63384',
            textDecoration: 'none',
            fontWeight: 'bold',
            backgroundColor: location.pathname === '/' ? '#d63384' : 'transparent',
            padding: '8px 12px',
            borderRadius: '20px',
          }}
        >
          Home
        </Link>

        {!user ? (
          <Link
            to="/login"
            style={{
              marginRight: '20px',
              color: location.pathname === '/login' ? '#fff' : '#d63384',
              textDecoration: 'none',
              fontWeight: 'bold',
              backgroundColor: location.pathname === '/login' ? '#d63384' : 'transparent',
              padding: '8px 12px',
              borderRadius: '20px',
            }}
          >
            Login
          </Link>
        ) : (
          <>
            <Link
              to="/admin"
              style={{
                marginRight: '20px',
                color: location.pathname === '/admin' ? '#fff' : '#d63384',
                textDecoration: 'none',
                fontWeight: 'bold',
                backgroundColor: location.pathname === '/admin' ? '#d63384' : 'transparent',
                padding: '8px 12px',
                borderRadius: '20px',
              }}
            >
              Admin
            </Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#d63384',
                color: '#fff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
