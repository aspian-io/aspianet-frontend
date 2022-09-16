import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AdminSlicesEnum } from "./admin-slices.type";

export interface IAdminLayoutState {
  sidebar: {
    minimizeSidebarCss: string;
    displaySidebarBtnCss: string;
    sidebarSideLayoutCss: string;
  };
}

const initialState: IAdminLayoutState = {
  sidebar: {
    minimizeSidebarCss: 'ltr:-left-[300px] ltr:md:left-4 rtl:-right-[300px] rtl:md:right-4',
    displaySidebarBtnCss: 'opacity-1 z-10 transition-all delay-300 duration-300 md:opacity-0 md:-z-10 md:delay-0',
    sidebarSideLayoutCss: 'w-full md:w-[calc(100%-272px)] ltr:md:ml-[272px] rtl:md:mr-[272px]'
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
    setDisplaySidebarBtnCss: (
      state: Draft<IAdminLayoutState>,
      action: PayloadAction<typeof initialState.sidebar.displaySidebarBtnCss>
    ) => {
      state.sidebar.displaySidebarBtnCss = action.payload;
    },
    setSidebarSideLayoutCss: (
      state: Draft<IAdminLayoutState>,
      action: PayloadAction<typeof initialState.sidebar.sidebarSideLayoutCss>
    ) => {
      state.sidebar.sidebarSideLayoutCss = action.payload;
    }
  }
} );

export const getAdminLayoutState = ( state: { adminLayout: IAdminLayoutState; } ) => state.adminLayout;

export const { setMinimizeSidebarCss, setSidebarSideLayoutCss, setDisplaySidebarBtnCss } = adminLayoutSlice.actions;

export const adminLayoutReducer = adminLayoutSlice.reducer;