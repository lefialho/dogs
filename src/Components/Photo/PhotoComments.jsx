import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../CreateContext';
import { PhotoCommentsForm } from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';

export function PhotoComments(props) {
  const [comments, setComments] = useState(() => props.comments);
  const { login } = useContext(UserContext);
  const commentsSection = useRef(null);

  useEffect(() => {
    commentsSection.current?.querySelector('li:last-child')?.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }, [comments]); // Ocorre sempre que for aberto o form ou postado um novo comentário

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  ); // Se estiver logado
}
