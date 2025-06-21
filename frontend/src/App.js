import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import LiveBanner from './components/LiveBanner';
import './App.css';

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      {/* Botão flutuante do WhatsApp */}
      <a
        href="https://wa.me/5544999846579"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          backgroundColor: '#ff69b4',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        }}
      >
        💬 Fale no WhatsApp
      </a>

      {/* Mensagem de país com bandeira */}
      <LiveBanner />
    </div>
  );
}

export default App;
