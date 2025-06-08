import { NavBar } from "../../components/NavBar";
import { TransactionsContent } from "../../components/ContentPages/TransactionsPage";

export const Transactions = () => {
  return (
    <div className=" text-zinc-50 from-zinc-900 w-screen select-none h-screen bg-linear-to-bl to-zinc-950 flex">
      <NavBar />
      <TransactionsContent />
    </div>
  );
};
