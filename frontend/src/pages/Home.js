// frontend/src/pages/Home.js
import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { useParams } from 'react-router-dom';

function Home() {
  const [lacos, setLacos] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { nome } = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const fetchLacos = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, 'lacos'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const normalize = str =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    const filtered = nome
      ? data.filter(l => normalize(l.category) === normalize(nome))
      : data;

    setLacos(filtered);
  }, [nome]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este laço?')) {
      await deleteDoc(doc(db, 'lacos', id));
      fetchLacos();
    }
  };

  useEffect(() => {
    fetchLacos();
  }, [fetchLacos]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Overlay */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '800px',
        margin: 'auto',
      }}>
        <h2 style={{ color: '#d63384' }}>🎀 Bem-vinda à Alice Acessórios 🎀</h2>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'black' }}>
          Cada laço é feito à mão com muito carinho para encantar bebês, crianças e adultos. 💕
        </p>
      </div>

      {/* Título da seção */}
      <h2 style={{ textAlign: 'center', color: '#d63384', marginBottom: '20px' }}>
        🎀 Nossos Laços 🎀
      </h2>

      {/* Galeria de laços */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px'
      }}>
        {lacos.map(laco => (
          <div key={laco.id} style={{
            width: '220px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <img
              src={laco.imageUrl}
              alt={laco.title}
              onClick={() => {
                setSelectedImage(laco.imageUrl);
                setShowModal(true);
              }}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            />
            <h4 style={{ color: '#d63384', margin: '10px 0 5px' }}>{laco.title}</h4>
            <p style={{ fontSize: '14px', color: '#333' }}>{laco.desc}</p>
            <p style={{ fontWeight: 'bold', color: '#000' }}>R$ {laco.price}</p>
            <p style={{ fontSize: '13px', color: '#666' }}>Categoria: {laco.category}</p>

            {user && (
              <button
                onClick={() => handleDelete(laco.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
              >
                🗑️ Deletar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal da imagem ampliada */}
      {showModal && selectedImage && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <img
            src={selectedImage}
            alt="Zoom"
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
