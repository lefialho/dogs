import { useState } from 'react';
import styles from './Image.module.css';

export function Image({ alt, ...props }) {
  const [skeleton, setSkeleton] = useState(true);
  function handleLoad({ target }) {
    // Animação ocorre sempre que a img é carregada 100%
    setSkeleton(false);
    target.style.opacity = 1;
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
}
