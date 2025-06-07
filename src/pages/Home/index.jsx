import { NavBar } from "../../components/NavBar";
import { HomeContent } from "../../components/ContentPages/HomePage";
export const Home = () => {
  return (
    <div className="bg-linear-to-bl from-zinc-900 to-zinc-950 w-screen select-none h-screen flex">
      <NavBar />
      <HomeContent />
    </div>
  );
};
