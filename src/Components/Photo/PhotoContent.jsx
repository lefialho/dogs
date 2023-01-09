import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../CreateContext';
import { Image } from '../Helper/Image';
import { PhotoComments } from './PhotoComments';
import styles from './PhotoContent.module.css';
import { PhotoDelete } from './PhotoDelete';

export function PhotoContent({ data, single }) {
  const { photo, comments } = data;
  const user = useContext(UserContext);
  // console.log(user.userData);

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.userData && user.userData.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@ {photo.author}</Link>
            )}

            <span className={styles.visualizations}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link className={styles.link} to={`/foto/${photo.id}`}>
              {photo.title}
            </Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso}Kg</li>
            <li>
              {photo.idade > 1 ? photo.idade + 'anos' : photo.idade + 'ano'}
            </li>
          </ul>
        </div>
        <PhotoComments single={single} id={photo.id} comments={comments} />
      </div>
    </div>
  );
}
