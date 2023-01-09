import { Button } from '../Forms/Button';
import { Error } from '../Helper/Error';
import { Input } from '../Forms/Input';
import { useForm } from '../../Hooks/useForm';
import { USER_POST } from '../../Api';
import { useContext } from 'react';
import { UserContext } from '../../CreateContext';
import { useFetch } from '../../Hooks/useFetch';
import { Head } from '../Helper/Head';

export function LoginCreate() {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  // const password = useForm('password'); Criado com validação
  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = useFetch();
  const disabled =
    username.value === '' || email.value === '' || password.value === '';

  async function createUser(e) {
    e.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value); // Se o usuário não existe
    // console.log(response);
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={createUser}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button disabled={disabled}>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
}
