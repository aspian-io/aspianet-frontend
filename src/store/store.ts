import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { adminLayoutReducer } from "./slices/admin/admin-layout-slice";
import { adminMediaReducer } from "./slices/admin/admin-media-slice";
import { layoutReducer } from "./slices/layout-slice";
import { userReducer } from "./slices/user-slice";

export const store = configureStore( {
  reducer: {
    adminLayout: adminLayoutReducer,
    adminMedia: adminMediaReducer,
    layout: layoutReducer,
    user: userReducer,
  }
} );

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;