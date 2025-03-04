import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setCounter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setCounter } = counterReducer.actions;
export default counterReducer.reducer;
