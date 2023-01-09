import styles from './UserPhotoPost.module.css';
import { Input } from '../Forms/Input';
import { Button } from '../Forms/Button';
import { Error } from '../Helper/Error';
import { useForm } from '../../Hooks/useForm';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { PHOTO_POST } from '../../Api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Head } from '../Helper/Head';

export function UserPhotoPost() {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');

  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]); // Ocorre quando o data alterar, ou seja fez a postagem do item

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(); //Necessário para enviar os dados junto com a img
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]), // Cria um preview da img
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
}
