import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { LoginCreate } from './LoginCreate';
import { LoginPasswordLost } from './LoginPasswordLost';
import { LoginPasswordReset } from './LoginPasswordReset';
import { useContext } from 'react';
import { UserContext } from '../../CreateContext';
import styles from './Login.module.css';
import { NotFound } from '../NotFound';

export function Login() {
  const { login } = useContext(UserContext);

  if (login) return <Navigate to="/conta" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="criar" element={<LoginCreate />}></Route>
          <Route path="perdeu" element={<LoginPasswordLost />}></Route>
          <Route path="resetar" element={<LoginPasswordReset />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}
