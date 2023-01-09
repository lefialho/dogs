import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../../CreateContext';
import { Feed } from '../Feed/Feed';
import { Head } from '../Helper/Head';
import { NotFound } from '../NotFound';
import { UserHeader } from './UserHeader';
import { UserPhotoPost } from './UserPhotoPost';
import { UserStats } from './UserStats';

export function User() {
  const { userData } = useContext(UserContext);
  // console.log(userData);

  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={userData.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}
