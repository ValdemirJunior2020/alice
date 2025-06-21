import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import LacoCard from '../components/LacoCard';

const Home = () => {
  const [lacos, setLacos] = useState([]);

  useEffect(() => {
    const fetchLacos = async () => {
      const snapshot = await getDocs(collection(db, 'lacos'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLacos(data);
    };

    fetchLacos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#d63384', textAlign: 'center' }}>Catálogo de Laços</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {lacos.map((laco) => (
          <LacoCard key={laco.id} laco={laco} />
        ))}
      </div>
    </div>
  );
};

export default Home;
