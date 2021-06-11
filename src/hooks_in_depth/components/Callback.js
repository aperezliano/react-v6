/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#usecallback
 */

// useCallback is implemented with useMemo under the hood

import { useCallback, memo, useState, useEffect } from 'react';

// With "memo" if the props don't change, the re-render is not triggered
const ExpensiveComputationComponent = memo(
  function ExpensiveComputationComponent({ compute, count }) {
    return (
      <>
        <h1>Computation: {compute(count)}</h1>
        <h4>Last re-rendered at {new Date().toLocaleTimeString()}</h4>
      </>
    );
  }
);

const CallbackComponent = () => {
  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(40);

  useEffect(() => {
    const timerId = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timerId);
  });

  const fibonacci = (n) => {
    return n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
  };

  return (
    <>
      <h1>useCallback Example</h1>
      <h2>{time.toLocaleTimeString()}</h2>
      <button onClick={() => setCount(count + 1)}>
        current count: {count}
      </button>
      <ExpensiveComputationComponent
        // eslint-disable-next-line react-hooks/exhaustive-deps
        compute={useCallback(fibonacci, [])}
        count={count}
      />
    </>
  );
};

export default CallbackComponent;
