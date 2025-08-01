import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { UsersRoutes } from "./index";
import { Home } from "../pages/Home/homePage";
import { Transactions } from "../pages/Transactions/transactionsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<UsersRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
};
