import NewArrivalBooks from "./books/NewArrivalBooks";
import Banner from "./components/home/Banner";
import CategoriesPage from "./components/home/Categories";

export default function Home() {
  return (
    <div>
      <Banner />
      <NewArrivalBooks />
      <CategoriesPage />
    </div>
  );
}
