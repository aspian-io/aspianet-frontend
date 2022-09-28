import { Dispatch, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../lib/agent";
import { IUserAuth } from "../../models/users/auth";
import { resetUserState, updateUser, updateUserError, updateUserLoadingState } from "../slices/user-slice";

export const refreshTokens = () => {
  return async ( dispatch: Dispatch ) => {
    dispatch(
      updateUserLoadingState( true )
    );
    try {
      const { data } = await axiosInstance.post<IUserAuth>( 'users/refresh-tokens', undefined );
      dispatch(
        updateUserLoadingState( false )
      );
      dispatch(
        updateUser( data )
      );
    } catch ( error ) {
      dispatch(
        updateUserLoadingState( false )
      );
      dispatch( resetUserState() );
      if ( axios.isAxiosError( error ) ) {
        return dispatch( updateUserError( error.response?.data as SerializedError ) );
      }
      return;
    }
  };
};