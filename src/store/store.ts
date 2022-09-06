import { configureStore } from "@reduxjs/toolkit";
import { layoutReducer } from "./slices/layout-slice";
import { userReducer } from "./slices/user-slice";

export const store = configureStore( {
  reducer: {
    layout: layoutReducer,
    user: userReducer
  }
} );