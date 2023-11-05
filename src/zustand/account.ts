import { UseFormReset } from "react-hook-form";

import { message } from "antd";

import { create } from "zustand";

import request from "../server/request";
import Universal from "../types/universal";

interface initialStateTypes {
  user: Universal;
  loading: boolean;
  photoLoad: boolean;
  photo: string;
  passwordLoad: boolean;
  getUser: (reset: UseFormReset<Universal>) => void;
  updateAccount: (values: object, reset: UseFormReset<Universal>) => void;
  uploadPhoto: (file: FormData) => void;
  updatePassword: (values: object, reset: UseFormReset<Universal>) => void;
}

const useAccount = create<initialStateTypes>()((set, get) => {
  const setState = (newState: object) => {
    return set((state) => ({ ...state, ...newState }));
  };

  return {
    user: {} as Universal,
    loading: false,
    photoLoad: false,
    photo: "",
    passwordLoad: false,
    getUser: async (reset) => {
      try {
        setState({ loading: true });
        const { data } = await request.get<Universal>("auth/me");
        setState({
          user: data,
          photo: data?.photo,
        });
        reset(data);
      } finally {
        setState({ loading: false });
      }
    },
    updateAccount: async (values, reset) => {
      try {
        setState({ loading: true });
        await request.put("auth/updatedetails", values);
        message.success("Changes successfully saved!");
        get().getUser(reset);
      } finally {
        setState({ loading: false });
      }
    },
    uploadPhoto: async (file) => {
      try {
        setState({ photoLoad: true });
        const { data } = await request.post<string>("auth/upload", file);
        setState({ photo: data });
      } finally {
        setState({ photoLoad: false });
      }
    },
    updatePassword: async (values, reset) => {
      try {
        setState({ passwordLoad: true });
        await request.put("auth/updatepassword", values);
        message.success("Passwrd successfully changes!");
        reset({ username: "", currentPassword: "", newPassword: "" });
      } finally {
        setState({ passwordLoad: false });
      }
    },
  };
});

export default useAccount;
