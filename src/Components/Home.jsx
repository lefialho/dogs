import { Feed } from './Feed/Feed';
import { Head } from './Helper/Head';

export function Home() {
  return (
    <section className="container main-container">
      <Head title="Fotos" description="Home com o feed de fotos" />
      <Feed />
    </section>
  );
}
