import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import Children from "../../types/children";
import skillReducer, { skillName } from "../slice/skills";

const reducer = {
  [skillName]: skillReducer,
};

export const Store = configureStore({ reducer });

const StoreProvider = ({ children }: Children) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
