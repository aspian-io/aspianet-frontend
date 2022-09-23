import { AnyAction, CombinedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { adminLayoutReducer } from "./slices/admin/admin-layout-slice";
import { layoutReducer } from "./slices/layout-slice";
import { userReducer } from "./slices/user-slice";

export const store = configureStore( {
  reducer: {
    adminLayout: adminLayoutReducer,
    layout: layoutReducer,
    user: userReducer
  }
} );

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;