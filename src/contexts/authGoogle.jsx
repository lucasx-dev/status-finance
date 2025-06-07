import { createContext, useState, useEffect, useContext } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { saveUser } from "../services/userServices";
const provider = new GoogleAuthProvider();

// eslint-disable-next-line react-refresh/only-export-components
export const AuthGoogleContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthGoogleContext);
};
export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    const storageUser = sessionStorage.getItem("@AuthGoogleFirebase:user");
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        await saveUser(user);
        setUser(user);
        sessionStorage.setItem("@AuthGoogleFirebase:token", token);
        sessionStorage.setItem(
          "@AuthGoogleFirebase:user",
          JSON.stringify(user)
        );
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", {
          code: error.code,
          message: error.message,
          email: error.customData?.email,
          credential: GoogleAuthProvider.credentialFromError(error),
        });
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("@AuthGoogleFirebase:token");
        sessionStorage.removeItem("@AuthGoogleFirebase:user");
        setUser(null);
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
      });
  };
  return (
    <AuthGoogleContext.Provider
      value={{ signInWithGoogle, logOut, signed: !!user, user }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
