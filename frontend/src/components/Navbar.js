import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    onAuthStateChanged(auth, setUser);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  const linkStyle = (path) => ({
    margin: '0 10px',
    color: location.pathname === path ? '#fff' : '#d63384',
    backgroundColor: location.pathname === path ? '#d63384' : 'transparent',
    padding: '8px 12px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'block',
  });

  const menuLinks = (
    <>
      <Link to="/" style={linkStyle('/')}>Home</Link>
      <Link to="/category/TIARA" style={linkStyle('/category/TIARA')}>Tiara</Link>
      <Link to="/category/LAÇOS MINI/PP" style={linkStyle('/category/LAÇOS MINI/PP')}>Laços MINI/PP</Link>
      <Link to="/category/LAÇOS P" style={linkStyle('/category/LAÇOS P')}>Laços P</Link>
      <Link to="/category/LAÇOS M" style={linkStyle('/category/LAÇOS M')}>Laços M</Link>
      <Link to="/category/LAÇOS G" style={linkStyle('/category/LAÇOS G')}>Laços G</Link>
      <Link to="/category/CONJUNTOS" style={linkStyle('/category/CONJUNTOS')}>Conjuntos</Link>
      {!user ? (
        <Link to="/login" style={linkStyle('/login')}>Login</Link>
      ) : (
        <>
          <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#d63384',
              color: '#fff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '20px',
              marginTop: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <nav style={{
      backgroundColor: '#ffc0cb',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <h2 style={{ margin: 0, fontWeight: 'bold', color: '#d63384' }}>
        🎀 Alice Acessórios
      </h2>

      {isMobile ? (
        <>
          <div
            onClick={() => setShowMenu(!showMenu)}
            style={{ fontSize: '28px', cursor: 'pointer', color: '#d63384' }}
          >
            ☰
          </div>
          {showMenu && (
            <div style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: '15px',
              marginTop: '10px',
              borderRadius: '10px'
            }}>
              {menuLinks}
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {menuLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
