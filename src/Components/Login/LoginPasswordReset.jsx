import { useEffect, useState } from 'react';
import { Input } from '../Forms/Input';
import { useForm } from '../../Hooks/useForm';
import { useFetch } from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../Api';
import { Error } from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import { Head } from '../Helper/Head';
import { Button } from '../Forms/Button';

export function LoginPasswordReset() {
  const [login, setLogin] = useState('');
  const [key, setKey] = useState('');
  const { error, loading, request } = useFetch();
  const password = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Pega os valores da pesquisa no navegador
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value, // Nova senha digitada pelo usuário
      });
      const { response } = await request(url, options);
      if (response.ok) {
        alert('Senha alterada com sucesso!');
        navigate('/login');
      }
    }
  }

  return (
    <section className="anime-left">
      <Head title="Redefine a senha" />
      <h1 className="title">Redefine a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button disabled={password.value === ''}>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
}
