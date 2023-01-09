// import { TOKEN_POST, USER_GET } from '../../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../Forms/Input';
import { Button } from '../Forms/Button';
import { useForm } from '../../Hooks/useForm';
import { UserContext } from '../../CreateContext';
import { useContext } from 'react';
import { Error } from '../Helper/Error.jsx';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { Head } from '../Helper/Head';

export function LoginForm() {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useContext(UserContext);
  // console.log(password.value);

  async function handleSubmit(e) {
    e.preventDefault();

    // Só faz o fetch se o usuário e email forem válidos
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos'} />
      </form>
      <Link className={styles.lost} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.registration}>
        <h2 className={styles.subtitle}>Cadastro</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
}

// ...... Antes de add o useContext ......

// Verifica se ja existe um token do usuario no localStorage para fazer o login só de entrar na tela
// useEffect(() => {
//   const token = window.localStorage.getItem('token');
//   if (token) getUser(token);
// }, []); // [] ocorre apenas uma vez

// async function getUser(token) {
//   const { url, options } = USER_GET(token);
//   const response = await fetch(url, options);
//   const json = await response.json();
//   console.log(json);
// }

// async function handleSubmit(e) {
//   e.preventDefault();

//   // Só faz o fetch se o usuário e email forem válidos
//   if (username.validate() && password.validate()) {
//     const { url, options } = TOKEN_POST({
//       username: username.value,
//       password: password.value,
//     });

//     const response = await fetch(url, options);
//     const json = await response.json();

//     window.localStorage.setItem('token', json.token);
//     getUser(json.token);
//     // console.log(json);
//   }
// }
