import { createSlice } from '@reduxjs/toolkit';

type RootLayoutState = {
  footerHeight: number;
  navHeight: number;
  minPageHeight: number;
};

const initialState: RootLayoutState = {
  footerHeight: 0,
  navHeight: 0,
  minPageHeight: 0,
};

const rootLayoutReducer = createSlice({
  name: 'rootLayout',
  initialState,
  reducers: {
    setFooterHeight: (state, action) => {
      state.footerHeight = action.payload;
    },
    setNavHeight: (state, action) => {
      state.navHeight = action.payload;
    },
    setMinPageHeight: (state, action) => {
      state.minPageHeight = action.payload;
    },
  },
});

export const { setFooterHeight, setNavHeight, setMinPageHeight } =
  rootLayoutReducer.actions;
export default rootLayoutReducer.reducer;
