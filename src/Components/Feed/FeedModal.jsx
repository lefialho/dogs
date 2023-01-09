import styles from './FeedModal.module.css';
import { useFetch } from '../../Hooks/useFetch';
import { useEffect } from 'react';
import { Error } from '../Helper/Error';
import { Loading } from '../Helper/Loading';
import { PhotoContent } from '../Photo/PhotoContent';
import { PHOTO_GET } from '../../Api';

export function FeedModal({ photo, setModalPhoto }) {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
    // console.log(photo);
  }, [photo, request]);

  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
}
