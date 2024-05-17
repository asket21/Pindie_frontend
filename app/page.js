
import { getNormalizedGamesDataByCategory} from "./api/api-utils"
import { Banner } from "./components/Banner/Banner"
import { Promo } from "./components/Promo/Promo"
import {  endpoints } from "./api/config"
import { CardsListSection } from "./components/CardsListSection/CardsListSection"



export default async function Home(props) {
  

  
  const popularGames = await getNormalizedGamesDataByCategory(endpoints.games,"popular");
  const newGames = await getNormalizedGamesDataByCategory(endpoints.games,"new"); 
  
  
  return (
    <main className="main">
      <Banner/>
       <CardsListSection type="slider" id ="popular" title="Популярные" data={popularGames} />
       <CardsListSection id="new" title="Новинки" data={newGames}/>           
      <Promo/>
    </main>
  );
  }


