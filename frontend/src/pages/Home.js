import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import LacoCard from '../components/LacoCard';

function Home() {
  const [lacos, setLacos] = useState([]);

  const fetchLacos = async () => {
    const querySnapshot = await getDocs(collection(db, 'lacos'));
    const lacosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLacos(lacosList);
  };

  useEffect(() => {
    fetchLacos();
  }, []);

  return (
    <>
      {/* Seção de fundo com mensagem */}
      <div
        style={{
          position: 'relative',
          
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',

            padding: '40px',
            borderRadius: '20px',
            maxWidth: '700px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ color: '#d63384', fontSize: '2.2rem' }}>
            Bem-vindo à nossa coleção de laços encantadores!
          </h1>
          <p style={{ fontSize: '1.1rem', marginTop: '10px', color: 'white', fontWeight: 'bold' }}>
  Cada laço é feito à mão com muito carinho para encantar bebês, crianças e adultos. 💕
</p>

        </div>
      </div>

      {/* Seção dos laços */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#d63384', marginBottom: '30px' }}>🌸 Nossos Laços</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
          }}
        >
          {lacos.map((laco) => (
            <LacoCard key={laco.id} laco={laco} fetchLacos={fetchLacos} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
