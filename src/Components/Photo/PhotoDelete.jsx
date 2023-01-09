import { PHOTO_DELETE } from '../../Api';
import { useFetch } from '../../Hooks/useFetch';
import styles from './PhotoDelete.module.css';

export function PhotoDelete({ id }) {
  const { loading, request } = useFetch();

  async function handleClick(e) {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload(); // Faz o reload após deletar a foto
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  );
}
