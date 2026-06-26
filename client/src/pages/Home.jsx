import Hero from "../components/Hero";
import FeaturedGames from "../components/FeaturedGames";
import Categories from "../components/Categories";
import Statistics from "../components/Statistics";
import Leaderboard from "../components/Leaderboard";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedGames />
      <Categories />
      <Statistics />
      <Leaderboard />
    </>
  );
}

export default Home;