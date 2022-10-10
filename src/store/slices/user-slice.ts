import { createSlice, Draft, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IUserAuth } from "../../models/auth/auth";
import { SlicesEnum } from "./slices.type";

export interface IUserState {
  loading: boolean;
  user?: IUserAuth;
  error: SerializedError | undefined;
}

const internalInitialState: IUserState = {
  loading: false,
  user: undefined,
  error: undefined
} as const;

export const userSlice = createSlice( {
  name: SlicesEnum.USER,
  initialState: internalInitialState,
  reducers: {
    updateUserLoadingState: (
      state: Draft<IUserState>,
      action: PayloadAction<typeof internalInitialState.loading>
    ) => {
      state.loading = action.payload;
    },
    updateUser: (
      state: Draft<IUserState>,
      action: PayloadAction<typeof internalInitialState.user>
    ) => {
      state.user = action.payload;
      state.error = undefined;
    },
    updateUserError: (
      state: Draft<IUserState>,
      action: PayloadAction<typeof internalInitialState.error>
    ) => {
      state.error = action.payload;
    },
    resetUserState: () => internalInitialState
  }
} );

// A small helper of user state for `useSelector` function.
export const getUserState = ( state: { user: IUserState; } ) => state.user;

// Exports all actions
export const { updateUserLoadingState, updateUser, resetUserState, updateUserError } = userSlice.actions;

// Export reducer
export const userReducer = userSlice.reducer;