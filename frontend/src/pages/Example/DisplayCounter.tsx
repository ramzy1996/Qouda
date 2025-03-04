import { useSelector } from 'react-redux';

import { selectCounterValue } from '@/store/selectors/counterSelectors';

const CounterDisplay = () => {
  const counterValue = useSelector(selectCounterValue);

  return <div>Counter Value: {counterValue}</div>;
};

export default CounterDisplay;
