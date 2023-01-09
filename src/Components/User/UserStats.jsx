import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { STATS_GET } from '../../Api';
import { useFetch } from '../../Hooks/useFetch';
import { Error } from '../Helper/Error';
import { Head } from '../Helper/Head';
import { Loading } from '../Helper/Loading';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

// Lazi Utilizado para partes pesadas do projeto ou libs externas
export function UserStats() {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Head title="Estatísticas" />
      <UserStatsGraphs data={data} />
    </Suspense>
  );
}
