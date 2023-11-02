import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LIMIT } from "../../constants";
import request from "../../server/request";
import Skill from "../../types/skill";
import User from "../../types/user";

interface InitialStateTypes {
  skills: Skill[];
  loading: boolean;
  total: number;
  next: number;
  page: number;
}

interface SkillsData {
  pagination: {
    total: number;
    next: number;
  };
  data: {
    _id: string;
    percent: number;
    name: string;
    user: User;
  }[];
}

const initialState: InitialStateTypes = {
  skills: [],
  loading: false,
  total: 0,
  next: 0,
  page: 1,
};

export const getSkills = createAsyncThunk(
  "skills/fetching",
  async ({ search, page }: { search: string; page: number }) => {
    const { data } = await request.get<SkillsData>("skills", {
      params: { search, page, limit: LIMIT },
    });
    return data;
  }
);

export const skillSlice = createSlice({
  initialState,
  name: "skill",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSkills.fulfilled,
        (state, { payload }: PayloadAction<SkillsData>) => {
          state.loading = false;
          state.skills = [...state.skills, ...payload.data];
          state.total = payload.pagination.total;
          state.next = payload.pagination.next;
        }
      )
      .addCase(getSkills.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { reducer: skillReducer, name: skillName } = skillSlice;

export { skillReducer as default, skillName };
