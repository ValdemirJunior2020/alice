import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import PostList from './pages/PostList';
import Navbar from './components/Navbar';
import LiveBanner from './components/LiveBanner';
import './App.css';

function App() {
  return (
    <Router>
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
        <Navbar />

        <Routes>
          <Route path="/category/:nome" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postlist" element={<PostList />} />
        </Routes>

        {/* Mensagem de contato acima do botão do WhatsApp */}
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 15px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            zIndex: 1000,
            maxWidth: '250px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Quer comprar ou tirar dúvidas? <br />
          Fale com a gente pelo WhatsApp! 👇
        </div>

        {/* Botão flutuante do WhatsApp */}
        <a
          href="https://wa.me/5544999846579"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            backgroundColor: '#25D366',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        >
          💬 Fale no WhatsApp
        </a>

        <LiveBanner />
      </div>
    </Router>
  );
}

export default App;
