import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { SlicesEnum } from "./slices";

export interface ILayoutState {
  siteNav: {
    isSearchOpen: boolean;
  }
}

const initialState: ILayoutState = {
  siteNav: {
    isSearchOpen: false
  }
} as const;

const layoutSlice = createSlice({
  name: SlicesEnum.LAYOUT,
  initialState,
  reducers: {
    setIsSearchOpen: (
      state: Draft<ILayoutState>,
      action: PayloadAction<typeof initialState.siteNav.isSearchOpen>
    ) => {
      state.siteNav.isSearchOpen = action.payload;
    }
  }
})

export const getLayoutState = (state: {layout: ILayoutState}) => state.layout;

export const {setIsSearchOpen} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;