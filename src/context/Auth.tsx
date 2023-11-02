import { createContext, useState } from "react";

import Cookies from "js-cookie";

import { TOKEN, USER } from "../constants";
import Children from "../types/children";

interface AuthContextTypes {
  isAuth: boolean;
  user: string | null;
  setIsAuth: (bool: boolean) => void;
  setUser: (user: string | null) => void;
}

export const AuthContext = createContext({} as AuthContextTypes);

const AuthContextProvider = ({ children }: Children) => {
  const userJson = localStorage.getItem(USER);
  const userStorage = userJson ? JSON.parse(userJson) : null;

  const [isAuth, setIsAuth] = useState(Boolean(Cookies.get(TOKEN)));
  const [user, setUser] = useState<string | null>(userStorage);

  const state = {
    isAuth,
    user,
    setUser,
    setIsAuth,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
