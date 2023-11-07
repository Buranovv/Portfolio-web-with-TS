import { NavigateFunction } from "react-router-dom";

import { FormInstance } from "antd";

import { create } from "zustand";

import request from "../server/request";
import ApiData from "../types/ApiData";
import PhotoData from "../types/photo";

const crud = <T>(url: string) => {
  interface initialStateTypes {
    allData: T[];
    loading: boolean;
    photoLoad: boolean;
    photo: PhotoData | null;
    page: number;
    total: number;
    selected: null | string;
    search: string;
    isModalOpen: boolean;
    isModalLoad: boolean;
    closeModal: () => void;
    showModal: (form: FormInstance<object>) => void;
    getAllData: (search: string, page: number, clientID: string) => void;
    addData: (values: object, clientID: string) => void;
    getSingleData: (id: string, form: FormInstance<object>) => void;
    updateData: (values: object, id: string, clientID: string) => void;
    uploadPhoto: (file: FormData) => void;
    deleteData: (id: string, clientID: string) => void;
    handleSearch: (
      e: React.ChangeEvent<HTMLInputElement>,
      pathname: string,
      navigate: NavigateFunction
    ) => void;
    setPage: (
      page: number,
      pathname: string,
      navigate: NavigateFunction
    ) => void;
  }

  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || 1;
  const search = params.get("search");

  return create<initialStateTypes>()((set, get) => {
    const setState = (newState: object) => {
      return set((state) => ({ ...state, ...newState }));
    };

    return {
      allData: [],
      loading: false,
      photoLoad: false,
      photo: {
        _id: "",
        name: "",
      },
      page: +page,
      total: 0,
      selected: null,
      search: search || "",
      isModalOpen: false,
      isModalLoad: false,
      closeModal: () => {
        setState({ isModalOpen: false, photo: null });
      },
      showModal: (form) => {
        setState({ isModalOpen: true, selected: null, photo: null });
        form.resetFields();
      },
      getAllData: async (search, page, clientID) => {
        try {
          const params = {
            search,
            page,
          };
          setState({ loading: true });
          const {
            data: { pagination, data },
          } = await request.get<ApiData>(
            `${url}?${clientID ? `user=${clientID}` : ""}`,
            {
              params,
            }
          );
          const newData = data.map((el: object, i: number) => ({
            ...el,
            key: i,
          }));
          setState({ allData: newData, total: pagination?.total });
        } finally {
          setState({ loading: false });
        }
      },
      addData: async (values, clientID) => {
        try {
          setState({ isModalLoad: true });
          await request.post(url, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page, clientID);
        } finally {
          setState({ isModalLoad: false });
        }
      },
      getSingleData: async (id, form) => {
        setState({ selected: id });
        const { data } = await request.get(`${url}/${id}`);
        let newData;
        if (url === "education" || url === "experiences") {
          newData = {
            ...data,
            startDate: new Date(data?.startDate).toISOString().substring(0, 10),
            endDate: new Date(data?.endDate).toISOString().substring(0, 10),
          };
        } else {
          newData = { ...data };
        }
        form.setFieldsValue(newData);
        setState({ isModalOpen: true, photo: data.photo });
      },
      updateData: async (values, id, clientID) => {
        try {
          setState({ isModalLoad: true });
          await request.put(`${url}/${id}`, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page, clientID);
        } finally {
          setState({ isModalLoad: false });
        }
      },
      uploadPhoto: async (file) => {
        try {
          setState({ photoLoad: true });
          const { data } = await request.post(`upload`, file);
          setState({ photo: data });
        } finally {
          setState({ photoLoad: false });
        }
      },
      deleteData: async (id, clientID) => {
        await request.delete(`${url}/${id}`);
        const { getAllData, search, page } = get();
        getAllData(search, page, clientID);
      },
      handleSearch: (e, pathname, navigate) => {
        setState({ search: e.target.value, page: 1 });
        const { page, search } = get();

        const query = new URLSearchParams();
        query.append("page", page.toString());
        query.append("search", search);

        navigate(`${pathname}?` + query);
      },
      setPage: (page, pathname, navigate) => {
        setState({ page });

        const query = new URLSearchParams();
        query.append("page", page.toString());
        query.append("search", get().search);

        navigate(`${pathname}?` + query);
      },
    };
  });
};

export default crud;
