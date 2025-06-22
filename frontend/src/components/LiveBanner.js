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

      const actions = [
  'acabou de visitar a página!',
  'acabou de comprar 2 laços!',
  'está navegando pelo catálogo!',
  'acabou de deixar uma avaliação!',
  'curtiu os acessórios!',
  'comprou 4 laços!',
  'fez um pedido em São Paulo!',
  'acabou de curtir um laço em Salvador!',
  'realizou uma compra em Belo Horizonte!',
  'visitou nosso site direto de Curitiba!',
  'acabou de deixar um comentário em Fortaleza!',
  'visitou a loja de Recife!',
  'finalizou a compra em Brasília!',
  'abriu a página de laços em Porto Alegre!',
  'visualizou um laço em Manaus!',
  'compartilhou um produto de Goiânia!',
  'adicionou um laço ao carrinho em Campinas!',
  'clicou no botão de WhatsApp em Natal!',
  'deixou uma avaliação 5 estrelas direto de João Pessoa!',
];


        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        setMessage(
          `${country ? `${getFlagEmoji(countryCode)} ` : ''}Alguém de ${country} ${randomAction}`
        );
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
        animation: 'flash 1.5s infinite',
      }}
    >
      {message}
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default LiveBanner;
