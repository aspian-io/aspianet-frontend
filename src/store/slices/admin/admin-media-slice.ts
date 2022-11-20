import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { SIDEBAR_SHOW_CSS } from "../../../components/admin/sidebar-nav/constants";
import { AdminSlicesEnum } from "./admin-slices.type";

export interface IAdminMediaState {
  readonly checkAll: boolean;
  readonly checkedItems: string[];
}

const initialState: IAdminMediaState = {
  checkAll: false,
  checkedItems: []
};

const adminMediaSlice = createSlice( {
  name: AdminSlicesEnum.ADMIN_MEDIA,
  initialState,
  reducers: {
    setCheckAll: (
      state: Draft<IAdminMediaState>,
      action: PayloadAction<typeof initialState.checkAll>
    ) => {
      state.checkAll = action.payload;
    },
    setCheckedItems: (
      state: Draft<IAdminMediaState>,
      action: PayloadAction<typeof initialState.checkedItems>
    ) => {
      state.checkedItems = action.payload;
    },
  }
} );

export const getAdminMediaState = ( state: { adminMedia: IAdminMediaState; } ) => state.adminMedia;

export const { setCheckedItems, setCheckAll } = adminMediaSlice.actions;

export const adminMediaReducer = adminMediaSlice.reducer;