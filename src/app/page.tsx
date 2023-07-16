import { Categories } from '@/components/CategoryDropDown';
import { Cards } from '@/components/Cards';

export default async function Home() {
  return (
    <>
      <Categories />
      <Cards />
    </>
  );
}
