import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import UploadForm from '../components/UploadForm';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email === 'kellen@admin.com') {
        setUser(currentUser);
      } else {
        setUser(null);
        setNotAllowed(true);
      }
    });
  }, []);

  if (notAllowed) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        Acesso negado. Apenas a administradora pode acessar essa página.
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#d63384', textAlign: 'center' }}>Painel Administrativo</h2>
      {user && <UploadForm />}
    </div>
  );
};

export default Admin;
