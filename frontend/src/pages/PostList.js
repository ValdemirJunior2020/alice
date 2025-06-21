import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function PostList() {
  const [lacos, setLacos] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', desc: '', price: '', category: '' });

  const fetchLacos = async () => {
    const querySnapshot = await getDocs(collection(db, 'lacos'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setLacos(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este laço?')) {
      await deleteDoc(doc(db, 'lacos', id));
      fetchLacos();
    }
  };

  const handleEdit = (laco) => {
    setEditItem(laco);
    setForm({
      title: laco.title,
      desc: laco.desc,
      price: laco.price,
      category: laco.category
    });
  };

  const handleUpdate = async () => {
    const docRef = doc(db, 'lacos', editItem.id);
    await updateDoc(docRef, { ...form });
    setEditItem(null);
    fetchLacos();
  };

  useEffect(() => {
    fetchLacos();
  }, []);

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Lista de Laços</h2>
      {lacos.map((laco) => (
        <div key={laco.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '15px', marginBottom: '15px' }}>
          <img src={laco.imageUrl} alt={laco.title} style={{ width: '150px' }} />
          <h3>{laco.title}</h3>
          <p>{laco.desc}</p>
          <p><strong>R${laco.price}</strong> - {laco.category}</p>
          <button onClick={() => handleEdit(laco)}>✏️ Editar</button>
          <button onClick={() => handleDelete(laco.id)} style={{ marginLeft: '10px' }}>🗑️ Deletar</button>
        </div>
      ))}

      {editItem && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#333', borderRadius: '10px' }}>
          <h3>Editando: {editItem.title}</h3>
          <input type="text" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input type="text" placeholder="Descrição" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          <input type="number" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Crianças</option>
            <option>Bebês</option>
            <option>Adultos</option>
          </select>
          <br />
          <button onClick={handleUpdate}>💾 Salvar Alterações</button>
          <button onClick={() => setEditItem(null)} style={{ marginLeft: '10px' }}>❌ Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default PostList;
