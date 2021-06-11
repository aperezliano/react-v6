/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#usememo
 */

import { useMemo, useState } from 'react';

// The point of useMemo is to avoid expensive calculations, so memoizing fibonacci
// is actually avoiding to showcase the problem, but who cares :)
const fibonacciMemoized = () => {
  const calculatedNumbers = new Map();

  return function fibonacci(n) {
    if (n <= 1) {
      return 1;
    }

    if (calculatedNumbers.has(n)) {
      return calculatedNumbers.get(n);
    }

    const result = fibonacci(n - 1) + fibonacci(n - 2);
    calculatedNumbers.set(n, result);
    return result;
  };
};

const fibonacci = fibonacciMemoized();
const MemoComponent = () => {
  const [num, setNum] = useState(1);
  const fibo = useMemo(() => fibonacci(num), [num]);
  return (
    <>
      <h1>useMemo Example</h1>
      <div>
        Fibonacci of {num} = {fibo}
      </div>
      <button onClick={() => setNum(num + 1)}>+</button>
    </>
  );
};

export default MemoComponent;
