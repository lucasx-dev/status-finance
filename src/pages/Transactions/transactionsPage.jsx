import { NavBar } from "../../components/NavBar";
import { TransactionsContent } from "../../components/ContentPages/TransactionsPage";

export const Transactions = () => {
  return (
    <div className="flex w-full h-screen bg-gray-950 h-screenbg-gradient-to-bl text-zinc-50 select-none overflow-hidden">
      <NavBar />
      <div className="flex-1 overflow-y-auto">
        <TransactionsContent />
      </div>
    </div>
  );
};