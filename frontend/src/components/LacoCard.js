import React, { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function LacoCard({ laco, fetchLacos }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm('Tem certeza que deseja deletar este laço?');
    if (confirm) {
      await deleteDoc(doc(db, 'lacos', laco.id));
      fetchLacos();
    }
  };

  return (
    <>
      <div style={{
        width: '240px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // fundo transparente
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '20px',
        backdropFilter: 'blur(5px)', // efeito fosco
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        {/* Imagem clicável */}
        <img
          src={laco.imageUrl}
          alt={laco.title}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
          onClick={() => setShowModal(true)}
        />

        <h4 style={{ color: '#d63384' }}>{laco.title}</h4>
        <p>{laco.desc}</p>
        <p><strong>R$ {laco.price}</strong></p>
        <p style={{ fontSize: '13px', color: '#555' }}>Categoria: {laco.category}</p>

        <button
          onClick={handleDelete}
          style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px',
            marginTop: '10px',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          🗑️ Deletar
        </button>
      </div>

      {/* Modal da imagem em tamanho grande */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <img
            src={laco.imageUrl}
            alt="zoom"
            style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '10px' }}
          />
        </div>
      )}
    </>
  );
}

export default LacoCard;
