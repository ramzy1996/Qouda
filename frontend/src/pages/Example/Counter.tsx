import { useDispatch } from 'react-redux';

import { counterActions } from '@/store/actions/counterActions';

const Counter = () => {
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch(counterActions.increment());
  };

  const setCounterValue = (value: number) => {
    dispatch(counterActions.setCounter(value));
  };

  return (
    <div>
      <button onClick={incrementCounter}>Increment</button>
      <br />
      <button onClick={() => setCounterValue(10)}>Set Counter to 10</button>
    </div>
  );
};

export default Counter;
