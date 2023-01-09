import { useRef, useState } from 'react';
import { COMMENT_POST } from '../../Api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import { useFetch } from '../../Hooks/useFetch';
import { Error } from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

export function PhotoCommentsForm({ id, setComments, single }) {
  const [comment, setComment] = useState('');
  const { request, error } = useFetch();
  const commentForm = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment('');
      commentForm.current.focus();
      setComments((comments) => [...comments, json]); // Pega os comentários anteriores e junta com o novo
      // console.log(json);
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        ref={commentForm}
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
}
