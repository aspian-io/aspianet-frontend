import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { SlicesEnum } from "./slices.type";

export interface IUserState {
  username: string;
  password: string;
}

const initialState: IUserState = {
  username: '',
  password: ''
} as const;

export const userSlice = createSlice( {
  name: SlicesEnum.USER,
  initialState,
  reducers: {
    setUserName: (
      state: Draft<IUserState>,
      action: PayloadAction<typeof initialState.username>
    ) => {
      state.username = action.payload;
    },
    setPassword (
      state: Draft<IUserState>,
      action: PayloadAction<typeof initialState.password>
    ) {
      state.password = action.payload;
    }
  }
} );

// A small helper of user state for `useSelector` function.
export const getUserState = ( state: { user: IUserState; } ) => state.user;

// Exports all actions
export const userActions = userSlice.actions;

// Export reducer
export const userReducer = userSlice.reducer;