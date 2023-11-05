import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LIMIT } from "../../constants";
import request from "../../server/request";
import UniversalData from "../../types/universalData";

interface InitialStateTypes {
  educations: UniversalData[];
  loading: boolean;
  total: number;
  next: number;
  page: number;
}

interface EducationsData {
  pagination: {
    total: number;
    next: number;
  };
  data: UniversalData[];
}

const initialState: InitialStateTypes = {
  educations: [],
  loading: false,
  total: 0,
  next: 0,
  page: 1,
};

export const getEducations = createAsyncThunk(
  "educations/fetching",
  async ({ search, page }: { search: string; page: number }) => {
    const { data } = await request.get<EducationsData>("education", {
      params: { page, limit: LIMIT, search },
    });
    return data;
  }
);

export const educationSlice = createSlice({
  initialState,
  name: "education",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEducations.fulfilled,
        (state, { payload }: PayloadAction<EducationsData>) => {
          state.loading = false;
          state.educations = [...state.educations, ...payload.data];
          state.total = payload.pagination.total;
          state.next = payload.pagination.next;
        }
      )
      .addCase(getEducations.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: educationReducer, name: educationName } = educationSlice;

export { educationReducer as default, educationName };
