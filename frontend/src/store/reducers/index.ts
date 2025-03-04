import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from './counterReducer';
import rootLayoutReducer from './rootLayoutReducer';

const appReducer = combineReducers({
  // reducers
  counter: counterReducer,
  rootLayout: rootLayoutReducer,
});

export const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
