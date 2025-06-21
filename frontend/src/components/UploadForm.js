import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';

const categorias = [
  'TIARA',
  'LAÇOS MINI/PP',
  'LAÇOS P',
  'LAÇOS M',
  'LAÇOS G',
  'PERSONALIZADOS'
];

function UploadForm({ fetchLacos }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categorias[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !title || !desc || !price) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      console.log('[Upload] Iniciando upload da imagem...');
      const filename = `${Date.now()}-${image.name.replace(/\s+/g, '_')}`;
      const storageRef = ref(storage, `lacos/${filename}`);
      await uploadBytes(storageRef, image);
      console.log('[Upload] Imagem enviada com sucesso.');

      const imageUrl = await getDownloadURL(storageRef);
      console.log('[Download URL]', imageUrl);

      await addDoc(collection(db, 'lacos'), {
        title,
        desc,
        price,
        category,
        imageUrl,
        createdAt: new Date()
      });

      alert('Laço cadastrado com sucesso!');
      setImage(null);
      setTitle('');
      setDesc('');
      setPrice('');
      setCategory(categorias[0]);
      fetchLacos();
    } catch (err) {
      console.error('[Erro no upload]', err);
      alert('Erro ao enviar imagem.');
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categorias.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" style={{ backgroundColor: '#d63384', color: 'white', padding: '10px', marginTop: '10px', border: 'none', borderRadius: '8px' }}>
        Enviar
      </button>
    </form>
  );
}

export default UploadForm;
