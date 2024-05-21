"use client";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

const categoryOfGames = {
  new: "Новинки",
  pixel: "Пиксельные",
  TDS: "TDS",
  popular: "Популярные",
  shooter: "Шутеры",
  runner: "Ранеры",
};

const getCategoryName = (category) => {
  return categoryOfGames[category];
};

export default function CategoryPage(props) {
  const arrayGamesByCategory = useGetDataByCategory(
    endpoints.games,
    props.params.category
  );
  const category = props.params.category;
  const title = getCategoryName(category);
  return (
    <main className="main-inner">
      {arrayGamesByCategory && Array.isArray(arrayGamesByCategory) ? (
        <CardsListSection
          id={arrayGamesByCategory.id}
          title={title}
          data={arrayGamesByCategory}
        />
      ) : (
        <Preloader />
      )}
    </main>
  );
}
