import { Dispatch, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";
import { IUserAuth } from "../../models/auth/auth";
import { resetUserState, updateUserError, updateUserLoadingState } from "../slices/user-slice";

export const updateCurrentUser = ( user?: IUserAuth ) => {
  return async ( dispatch: Dispatch ) => {
    const session = await getSession();
    if ( session ) {
      try {
        dispatch(
          updateUserLoadingState( true )
        );
        // const currentUser = await AuthAgent.getCurrentUser();
        // dispatch( updateUser( currentUser ) );
        dispatch(
          updateUserLoadingState( false )
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
    }
  };
};