import { UserHeaderNav } from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export function UserHeader() {
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      case '/conta/postar':
        setTitle('Poste Sua Foto');
        break;
      default:
        setTitle('Minha Contas');
    }
    // console.log(location);
  }, [location]); // Troca o título toda vez que o location é modificado

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
}
