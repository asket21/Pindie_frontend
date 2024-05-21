"use client"
import { useGetDataByCategory} from "./api/api-hooks"
import { Banner } from "./components/Banner/Banner"
import { Promo } from "./components/Promo/Promo"
import {  endpoints } from "./api/config"
import { CardsListSection } from "./components/CardsListSection/CardsListSection"
import { Preloader } from "./components/Preloader/Preloader"



export default function Home() {
  
  const popularGames = useGetDataByCategory(endpoints.games,"popular");
  const newGames = useGetDataByCategory(endpoints.games,"new"); 
  
  return (
    <main className="main">
    <Banner/>
     {popularGames && Array.isArray(popularGames) ? <CardsListSection type="slider" id ="popular" title="Популярные" data={popularGames} /> : <Preloader/>}
     {newGames && Array.isArray(newGames) ? <CardsListSection id="new" title="Новинки" data={newGames}/> : <Preloader/>}
    <Promo/>
  </main>
  );
  }


