import NewArrivalBooks from "./components/home/NewArrivalBooks";
import Banner from "./components/home/Banner";
import PopularBooks from "./components/home/PopularBooks";
import Categories from "./components/home/Categories";

export default function Home() {
  return (
    <div>
      <Banner />
      <NewArrivalBooks />
      <Categories />
      <PopularBooks />
    </div>
  );
}
