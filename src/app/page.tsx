import { Categories } from '@/components/CategoryDropDown';
import { Cards } from '@/components/Cards';
import Footer from '@/components/Footer';

export default async function Home() {
  return (
    <>
      <Categories />
      <Cards />
      <Footer />
    </>
  );
}
