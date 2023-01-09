import styles from './Footer.module.css';
import { ReactComponent as Dogs } from '../Assets/dogs-footer.svg';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
}
