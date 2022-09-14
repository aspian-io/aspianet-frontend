import { configureStore } from "@reduxjs/toolkit";
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