import { useEffect } from 'react';
import { useState } from 'react';
import { FeedModal } from './FeedModal';
import { FeedPhotos } from './FeedPhotos';
import PropTypes from 'prop-types';

export function Feed({ user }) {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [pages, setPages] = useState([1]);
  const [infinite, setInfinite] = useState(true);

  useEffect(() => {
    let wait = false;

    function infinitScroll(e) {
      // Enquanto tiver conteúdo para dar scroll infinite = true
      if (infinite) {
        const scroll = window.scrollY; // Altura do scroll
        const heightPage = document.body.offsetHeight - window.innerHeight; // Altura da página

        // se scroll for 75% maior do que a altura da página e wait true
        if (scroll > heightPage * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]); // Pega o total de páginas e add mais no array
          wait = true;
          // Segura a função para não ativar diversas vezes
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
      // console.log(e)
      // console.log(scroll);
      // console.log(heightPage);
    }

    window.addEventListener('wheel', infinitScroll);
    window.addEventListener('scroll', infinitScroll);
    return () => {
      // callback do useEffect limpa a função, removendo o evento
      window.removeEventListener('wheel', infinitScroll);
      window.removeEventListener('scroll', infinitScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          user={user}
          page={page}
          key={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
}

Feed.defaultProps = {
  // usuario default admin
  user: 0,
};

// Ideal passar o propTypes para qualquer componente que recebe uma propriedade
Feed.propTypes = {
  // Evita dar undefined na rota da api de usuário
  user: PropTypes.oneOfType([
    // Array para aceitar números ou strings
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};
