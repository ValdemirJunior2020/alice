// frontend/src/pages/UploadForm.js
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';


function UploadForm({ fetchLacos }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Crianças');

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
      setCategory('Crianças');
      fetchLacos();
    } catch (err) {
      console.error('[Erro no upload]', err);
      alert('Erro ao enviar imagem.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Crianças</option>
        <option>Bebês</option>
        <option>Adultos</option>
      </select>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default UploadForm;
