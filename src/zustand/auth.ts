import { message } from "antd";

import Cookies from "js-cookie";
import { create } from "zustand";

import {
  ID,
  LAST_URL_admin,
  LAST_URL_client,
  LAST_URL_user,
  ROLE,
  TOKEN,
} from "../constants";
import request from "../server/request";

interface Auth {
  isAuth: boolean;
  role: null | string;
  loading: boolean;
  clientID: string;
  login: (values: object, navigate: (arg: string) => void) => void;
  signUp: (values: object, navigate: (arg: string) => void) => void;
  logout: (navigate: (arg: string) => void) => void;
}

const useAuth = create<Auth>()((set, get) => {
  const setState = (newState: object) => {
    return set((state) => ({ ...state, ...newState }));
  };

  return {
    isAuth: Boolean(Cookies.get(TOKEN)),
    role: localStorage.getItem(ROLE) || null,
    loading: false,
    clientID: localStorage.getItem(ID) || "",
    login: async (values, navigate) => {
      try {
        setState({ loading: true });

        const {
          data: { token, user },
        } = await request.post<{
          token: string;
          user: { role: string; _id: "string" };
        }>("auth/login", values);

        message.success("Successfully logged in!");

        Cookies.set(TOKEN, token);
        localStorage.setItem(ROLE, user?.role);

        request.defaults.headers.Authorization = `Bearer ${token}`;
        setState({ isAuth: true, role: user?.role });

        if (user?.role === "client") {
          navigate(Cookies.get(LAST_URL_client) || "/dashboard");
          Cookies.remove(LAST_URL_client);
          localStorage.setItem(ID, user?._id);
          setState({ clientID: user?._id });
        } else if (user?.role === "user") {
          navigate(Cookies.get(LAST_URL_user) || "/waitPage");
          Cookies.remove(LAST_URL_user);
        } else {
          navigate(Cookies.get(LAST_URL_admin) || "/dashboard");
          Cookies.remove(LAST_URL_admin);
          setState({ clientID: "" });
        }
      } finally {
        setState({ loading: false });
      }
    },
    signUp: async (values, navigate) => {
      try {
        setState({ loading: false });
        const {
          data: { token, user },
        } = await request.post("auth/register", values);
        message.success("Successfully registered!");

        Cookies.set(TOKEN, token);
        localStorage.setItem(ROLE, user?.role);
        request.defaults.headers.Authorization = `Bearer ${token}`;

        navigate("/waitPage");
      } finally {
        setState({ loading: false });
      }
    },
    logout: (navigate) => {
      Cookies.remove(TOKEN);
      localStorage.removeItem(ROLE);
      localStorage.removeItem(ID);

      const { role } = get();
      let lastUrl: string = "";
      if (role === "admin") {
        lastUrl = LAST_URL_admin;
      } else if (role === "client") {
        lastUrl = LAST_URL_client;
      } else {
        lastUrl = LAST_URL_user;
      }
      Cookies.set(lastUrl, location.pathname + location.search);
      navigate("/");
      setState({ isAuth: false, role: null });
    },
  };
});

export default useAuth;
