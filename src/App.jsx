import { AppRoutes } from "./routes/routes";
import { AuthGoogleProvider } from "./contexts/authGoogle";
import { BrowserRouter } from "react-router-dom";
import { LogicProvider } from "./hooks/LogicContext";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthGoogleProvider>
        <LogicProvider>
          <AppRoutes />
        </LogicProvider>
      </AuthGoogleProvider>
    </BrowserRouter>
  );
};
