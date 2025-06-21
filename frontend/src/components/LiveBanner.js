import React, { useEffect, useState } from 'react';

const LiveBanner = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getGeoInfo = async () => {
      try {
        const res = await fetch('https://ipapi.co/json');
        const data = await res.json();
        const country = data.country_name;
        const countryCode = data.country_code;

        // Mensagens simuladas
        const actions = [
          'acabou de visitar a página!',
          'acabou de comprar 2 laços!',
          'está navegando pelo catálogo!',
          'acabou de deixar uma avaliação!',
          'curtiu os acessórios!',
          'comprou 4 laços!',
        ];

        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        setMessage(`🇨🇽 ${country ? `🇨🇽`.replace('🇨🇽', getFlagEmoji(countryCode)) : ''} Alguém de ${country} ${randomAction}`);
      } catch (err) {
        console.log('Erro ao obter localização:', err);
      }
    };

    getGeoInfo();
  }, []);

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '';
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ffe6f0',
        color: '#d63384',
        textAlign: 'center',
        padding: '8px',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
      }}
    >
      {message}
    </div>
  );
};

export default LiveBanner;
