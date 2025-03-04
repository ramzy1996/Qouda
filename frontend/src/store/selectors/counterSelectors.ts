import { RootState } from '../reducers';

export const selectCounterValue = (state: RootState) => state.counter.value;
