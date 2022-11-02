import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { SIDEBAR_SHOW_CSS } from "../../../components/admin/sidebar-nav/constants";
import { AdminSlicesEnum } from "./admin-slices.type";

export interface IAdminLayoutState {
  sidebar: {
    minimizeSidebarCss: string;
    sidebarSideLayoutCss: string;
    backdropCss: string;
  };
}

const initialState: IAdminLayoutState = {
  sidebar: {
    minimizeSidebarCss: SIDEBAR_SHOW_CSS,
    sidebarSideLayoutCss: 'w-full md:w-[calc(100%-272px)] ltr:md:ml-[272px] rtl:md:mr-[272px]',
    backdropCss: 'fixed inset-0 h-0 w-0 md:hidden md:h-0 md:w-0'
  }
} as const;

const adminLayoutSlice = createSlice( {
  name: AdminSlicesEnum.ADMIN_LAYOUT,
  initialState,
  reducers: {
    setMinimizeSidebarCss: (
      state: Draft<IAdminLayoutState>,
      action: PayloadAction<typeof initialState.sidebar.minimizeSidebarCss>
    ) => {
      state.sidebar.minimizeSidebarCss = action.payload;
    },
    setSidebarSideLayoutCss: (
      state: Draft<IAdminLayoutState>,
      action: PayloadAction<typeof initialState.sidebar.sidebarSideLayoutCss>
    ) => {
      state.sidebar.sidebarSideLayoutCss = action.payload;
    },
    setBackDropCss: (
      state: Draft<IAdminLayoutState>,
      action: PayloadAction<typeof initialState.sidebar.backdropCss>
    ) => {
      state.sidebar.backdropCss = action.payload;
    }
  }
} );

export const getAdminLayoutState = ( state: { adminLayout: IAdminLayoutState; } ) => state.adminLayout;

export const {
  setMinimizeSidebarCss,
  setSidebarSideLayoutCss,
  setBackDropCss } = adminLayoutSlice.actions;

export const adminLayoutReducer = adminLayoutSlice.reducer;