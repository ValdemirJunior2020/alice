import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const LacoCard = ({ laco }) => {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(5);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), where('lacoId', '==', laco.id));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setReviews(data);
    };

    fetchReviews();
  }, [laco.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Você precisa estar logado para comentar');

    await addDoc(collection(db, 'reviews'), {
      lacoId: laco.id,
      userEmail: user.email,
      comment,
      stars,
      createdAt: new Date()
    });

    setComment('');
    setStars(5);

    // Recarrega reviews
    const q = query(collection(db, 'reviews'), where('lacoId', '==', laco.id));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    setReviews(data);
  };

  return (
    <div style={{ width: '240px', background: 'white', padding: '12px', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
      <img src={laco.imageUrl} alt={laco.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }} />
      <h4 style={{ color: '#d63384' }}>{laco.title}</h4>
      <p>{laco.desc}</p>
      <p><strong>R$ {laco.price}</strong></p>
      <p style={{ fontSize: '13px', color: '#666' }}>Categoria: {laco.category}</p>

      <hr />

      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe seu comentário"
          required
          style={{ width: '100%', padding: '6px', marginBottom: '6px', borderRadius: '6px' }}
        />

        <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} estrela{n > 1 && 's'}</option>
          ))}
        </select>

        <button
          type="submit"
          style={{ marginTop: '6px', width: '100%', backgroundColor: '#ff69b4', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px' }}
        >
          Enviar Avaliação
        </button>
      </form>

      {reviews.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h5 style={{ marginBottom: '5px' }}>Avaliações:</h5>
          {reviews.map((r, idx) => (
            <div key={idx} style={{ borderTop: '1px solid #eee', marginTop: '5px', paddingTop: '5px' }}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{r.userEmail}</p>
              <p style={{ margin: 0 }}>{'⭐'.repeat(r.stars)}</p>
              <p style={{ fontSize: '14px' }}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LacoCard;
