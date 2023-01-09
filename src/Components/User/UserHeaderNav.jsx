import { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../CreateContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AddFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import { useMedia } from '../../Hooks/useMedia';
import { useEffect } from 'react';

export function UserHeaderNav() {
  const { userLogout } = useContext(UserContext);
  const mobile = useMedia('(max-width: 48rem)');
  const [mobileMenu, setMobileMenu] = useState(false);
  // console.log(mobile);

  const { pathname } = useLocation();
  // console.log(pathname);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]); // Fecha o menu sempre que muda o path name

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileBtn} ${
            mobileMenu && styles.mobileBtnActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav>
        <ul
          className={`${mobile ? styles.navMobile : styles.nav} ${
            mobileMenu && styles.navMobileActive
          }`}
        >
          <li>
            {' '}
            {/* end * faz apenas o item selecionado ficar ativo */}
            <NavLink to="/conta" end>
              <MinhasFotos />
              {mobile && 'Minhas Fotos'}
            </NavLink>
          </li>
          <li>
            <NavLink to="/conta/estatisticas">
              <Estatisticas />
              {mobile && 'Estatísticas'}
            </NavLink>
          </li>
          <li>
            {' '}
            <NavLink to="/conta/postar">
              <AddFoto />
              {mobile && 'Adicionar foto'}
            </NavLink>
          </li>
          <li>
            {' '}
            <button onClick={userLogout}>
              <Sair />
              {mobile && 'Sair'}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
