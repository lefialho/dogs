import { Input } from '../Forms/Input';
import { Button } from '../Forms/Button';
import { useForm } from '../../Hooks/useForm';
import { useFetch } from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../Api';
import { Error } from '../Helper/Error';
import { Head } from '../Helper/Head';

export function LoginPasswordLost() {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    // Se tiver algo preenchido
    if (login.validate()) {
      const urlBrowser = window.location.href;
      // login pode ser email ou nome de usuário
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: urlBrowser.replace('perdeu', 'resetar'),
      });
      const { json } = await request(url, options);
      console.log(json);
    }
  }

  return (
    <section>
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Envindo...</Button>
          ) : (
            <Button disabled={login.value === ''}>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
}
