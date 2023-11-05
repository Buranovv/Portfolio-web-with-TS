import { message } from "antd";

import Cookies from "js-cookie";
import { create } from "zustand";

import { ROLE, TOKEN } from "../constants";
import request from "../server/request";

interface Auth {
  isAuth: boolean;
  role: null | string;
  login: (values: object, navigate: (arg: string) => void) => void;
  signUp: (values: object, navigate: (arg: string) => void) => void;
  logout: (navigate: (arg: string) => void) => void;
}

const useAuth = create<Auth>()((set) => {
  const setState = (newState: object) => {
    return set((state) => ({ ...state, ...newState }));
  };

  return {
    isAuth: Boolean(Cookies.get(TOKEN)),
    role: localStorage.getItem(ROLE) || null,
    login: async (values, navigate) => {
      const {
        data: { token, user },
      } = await request.post<{ token: string; user: { role: string } }>(
        "auth/login",
        values
      );

      message.success("Successfully logged in!");

      Cookies.set(TOKEN, token);
      localStorage.setItem(ROLE, user?.role);

      request.defaults.headers.Authorization = `Bearer ${token}`;
      setState({ isAuth: true, role: user?.role });

      if (user?.role === "client") {
        navigate("/clientDashboard");
      } else if (user?.role === "user") {
        navigate("/waitPage");
      } else {
        navigate("/dashboard");
      }
    },
    signUp: async (values, navigate) => {
      const {
        data: { token, user },
      } = await request.post("auth/register", values);
      message.success("Successfully registered!");

      Cookies.set(TOKEN, token);
      localStorage.setItem(ROLE, user?.role);
      request.defaults.headers.Authorization = `Bearer ${token}`;

      navigate("/waitPage");
    },
    logout: (navigate) => {
      Cookies.remove(TOKEN);
      localStorage.removeItem(ROLE);
      navigate("/");
      setState({ isAuth: false, role: null });
    },
  };
});

export default useAuth;
