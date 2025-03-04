import { RootState } from '../reducers';

export const selectFooterHeight = (state: RootState) =>
  state.rootLayout.footerHeight;
export const selectNavHeight = (state: RootState) => state.rootLayout.navHeight;
export const selectMinPageHeight = (state: RootState) =>
  state.rootLayout.minPageHeight;
