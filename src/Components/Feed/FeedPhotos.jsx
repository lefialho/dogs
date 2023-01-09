import { FeedPhotosItem } from './FeedPhotosItem';
import { useFetch } from '../../Hooks/useFetch';
import { useEffect } from 'react';
import { PHOTOS_GET } from '../../Api';
import { Error } from '../Helper/Error';
import { Loading } from '../Helper/Loading';
import styles from './FeedPhotos.module.css';

export function FeedPhotos({ page, user, setModalPhoto, setInfinite }) {
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const totalItems = 6;
      const { url, options } = PHOTOS_GET({
        page,
        totalItems,
        user,
      });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < totalItems) {
        setInfinite(false); // Total de itens esgotou no scroll
      }
      // console.log(json);
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {data.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
}
