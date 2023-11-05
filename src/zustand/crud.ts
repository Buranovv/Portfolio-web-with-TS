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
    getAllData: (search: string, page: number) => void;
    addData: (values: object) => void;
    getSingleData: (id: string, form: FormInstance<object>) => void;
    updateData: (values: object, id: string) => void;
    uploadPhoto: (file: FormData) => void;
    deleteData: (id: string) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setPage: (page: number) => void;
  }

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
      page: 1,
      total: 0,
      selected: null,
      search: "",
      isModalOpen: false,
      isModalLoad: false,
      closeModal: () => {
        setState({ isModalOpen: false, photo: null });
      },
      showModal: (form) => {
        setState({ isModalOpen: true, selected: null, photo: null });
        form.resetFields();
      },
      getAllData: async (search, page) => {
        try {
          const params = {
            search,
            page,
          };
          setState({ loading: true });
          const {
            data: { pagination, data },
          } = await request.get<ApiData>(url, {
            params,
          });
          const newData = data.map((el: object, i: number) => ({
            ...el,
            key: i,
          }));
          setState({ allData: newData, total: pagination?.total });
        } finally {
          setState({ loading: false });
        }
      },
      addData: async (values) => {
        try {
          setState({ isModalLoad: true });
          await request.post(url, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page);
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
        setState({ isModalOpen: true });
      },
      updateData: async (values, id) => {
        try {
          setState({ isModalLoad: true });
          await request.put(`${url}/${id}`, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page);
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
      deleteData: async (id) => {
        await request.delete(`${url}/${id}`);
        const { getAllData, search, page } = get();
        getAllData(search, page);
      },
      handleSearch: (e) => setState({ search: e.target.value, page: 1 }),
      setPage: (page) => setState({ page }),
    };
  });
};

export default crud;
