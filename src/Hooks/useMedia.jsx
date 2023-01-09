import { useEffect, useState } from 'react';

export function useMedia(media) {
  const [match, setMatch] = useState('null');

  useEffect(() => {
    function changeMatchMedia() {
      // MatchMedia verifica true ou false, uma largura ou altura @media especificada
      const { matches } = window.matchMedia(media);
      setMatch(matches);
      // console.log(matches);
    }
    changeMatchMedia(); // Ativa pelo menos uma vez por padrão
    window.addEventListener('resize', changeMatchMedia);
    return () => {
      // Remove o evento quando o elemento sair da tela
      window.removeEventListener('resize', changeMatchMedia);
    };
  }, [media]);

  return match;
}
