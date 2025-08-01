import { NavBar } from "../../components/NavBar";
import { HomeContent } from "../../components/ContentPages/HomePage";
export const Home = () => {
  return (
    <div className="flex w-full h-screen bg-gray-950 bg-gradient-to-bl text-zinc-50 select-none overflow-hidden">
      <NavBar />
       <div className="flex-1 overflow-y-auto">
      <HomeContent />
        </div>
    </div>
  );
};
