import { message } from "antd";

import { create } from "zustand";

import request from "../server/request";
import Universal from "../types/universal";

interface DataType {
  pagination: {
    total: number;
    next: number;
  };
  data: Universal;
}

interface initialStateTypes {
  users: Universal[];
  loading: boolean;
  total: number;
  page: number;
  search: string;
  getAll: (search: string, page: number) => void;
  confirmUserToClient: (id: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: (page: number) => void;
}

const useGetNotClientUsers = create<initialStateTypes>()((set, get) => {
  const setState = (newState: object) => {
    return set((state) => ({ ...state, ...newState }));
  };

  return {
    users: [],
    loading: false,
    total: 0,
    page: 1,
    search: "",
    getAll: async (search, page) => {
      const params = {
        search,
        page,
      };
      try {
        setState({ loading: true });
        const {
          data: { pagination, data },
        } = await request.get<DataType>("users?role=user", {
          params,
        });
        const newData = data.map((el: object, i: number) => ({
          ...el,
          key: i,
        }));
        setState({
          users: newData,
          total: pagination?.total,
        });
      } finally {
        setState({ loading: false });
      }
    },
    confirmUserToClient: async (id) => {
      await request.put(`users/${id}`, { role: "client" });
      message.success("Successfully confirmed to client!");
      const { getAll, search, page } = get();
      getAll(search, page);
    },
    handleSearch: (e) => {
      setState({ search: e.target.value, page: 1 });
    },
    setPage: (page) => setState({ page }),
  };
});

export default useGetNotClientUsers;
