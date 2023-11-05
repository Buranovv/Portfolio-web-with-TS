// import { FormInstance, message } from "antd";

import UniversalData from "../types/universalData";
import crud from "./crud";

// import { create } from "zustand";

// import request from "../server/request";
// import ApiData from "../types/ApiData";
// import UniversalData from "../types/universalData";

// interface initialStateTypes {
//   allData: UniversalData[];
//   loading: boolean;
//   photoLoad: boolean;
//   photo: object;
//   page: number;
//   total: number;
//   selected: null | string;
//   search: string;
//   isModalOpen: boolean;
//   isModalLoad: boolean;
//   closeModal: () => void;
//   showModal: (form: FormInstance<object>) => void;
//   getAllData: (search: string, page: number) => void;
//   addData: (values: object) => void;
//   getSingleData: (id: string, form: FormInstance<object>) => void;
//   updateData: (values: object, id: string) => void;
//   uploadPhoto: (file: FormData) => void;
//   deleteData: (id: string) => void;
//   handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   setPage: (page: number) => void;
// }

// const useEducation = create<initialStateTypes>()((set, get) => {
//   const setState = (newState: object) => {
//     return set((state) => ({ ...state, ...newState }));
//   };

//   return {
//     allData: [],
//     loading: false,
//     photoLoad: false,
//     photo: {},
//     page: 1,
//     total: 0,
//     selected: null,
//     search: "",
//     isModalOpen: false,
//     isModalLoad: false,
//     closeModal: () => {
//       setState({ isModalOpen: false });
//     },
//     showModal: (form) => {
//       setState({ isModalOpen: true, selected: null });
//       form.resetFields();
//     },
//     getAllData: async (search, page) => {
//       try {
//         const params = {
//           search,
//           page,
//         };
//         setState({ loading: true });
//         const {
//           data: { pagination, data },
//         } = await request.get<ApiData>("education", {
//           params,
//         });
//         const newData = data.map((el: object, i: number) => ({
//           ...el,
//           key: i,
//         }));
//         setState({ allData: newData, total: pagination?.total });
//       } catch (error) {
//         if (error instanceof Error) {
//           message.error(error.message);
//         }
//       } finally {
//         setState({ loading: false });
//       }
//     },
//     addData: async (values) => {
//       try {
//         setState({ isModalLoad: true });
//         await request.post<ApiData>("education", values);
//         const { page, search, getAllData } = get();
//         setState({ isModalOpen: false });
//         getAllData(search, page);
//       } catch (error) {
//         if (error instanceof Error) {
//           message.error(error.message);
//         }
//       } finally {
//         setState({ isModalLoad: false });
//       }
//     },
//     getSingleData: async (id, form) => {
//       try {
//         setState({ selected: id });
//         const { data } = await request.get<UniversalData>(`education/${id}`);
//         const newData = {
//           ...data,
//           startDate: new Date(data?.startDate).toISOString().substring(0, 10),
//           endDate: new Date(data?.endDate).toISOString().substring(0, 10),
//         };
//         form.setFieldsValue(newData);
//         setState({ isModalOpen: true });
//       } catch (error) {
//         if (error instanceof Error) {
//           message.error(error.message);
//         }
//       }
//     },
//     updateData: async (values, id) => {
//       try {
//         setState({ isModalLoad: true });
//         await request.put<ApiData>(`education/${id}`, values);
//         const { page, search, getAllData } = get();
//         setState({ isModalOpen: false });
//         getAllData(search, page);
//       } catch (error) {
//         if (error instanceof Error) {
//           message.error(error.message);
//         }
//       } finally {
//         setState({ isModalLoad: false });
//       }
//     },
//     uploadPhoto: async (file) => {
//       try {
//         setState({ photoLoad: true });
//         const { data } = await request.post<object>(`upload`, file);
//         setState({ photo: data });
//       } catch (error) {
//         if (error instanceof Error) {
//           message.error(error.message);
//         }
//       } finally {
//         setState({ photoLoad: false });
//       }
//     },
//     deleteData: async (id) => {
//       try {
//         await request.delete(`education/${id}`);
//         const { getAllData, search, page } = get();
//         getAllData(search, page);
//       } catch (error) {
//         if (error instanceof Error) {
//           message.error(error.message);
//         }
//       }
//     },
//     handleSearch: (e) => setState({ search: e.target.value, page: 1 }),
//     setPage: (page) => setState({ page }),
//   };
// });

// export default useEducation;

const useEducation = crud<UniversalData>("education");

export default useEducation;
