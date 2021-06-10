/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#useref
 */

import { useState, useRef } from 'react';

const RefComponent = () => {
  const [stateNumber, setNumber] = useState(0);
  const Refnumber = useRef(0);

  function incrementAndDelayedLogging() {
    setNumber(stateNumber + 1);
    Refnumber.current++;
    setTimeout(
      // This will always log the latest RefNumber and each time the state associated with that render
      () => alert(`State: ${stateNumber} | Ref: ${Refnumber.current}`),
      500
    );
  }

  return (
    <>
      <h1>useRef Example</h1>
      <button onClick={incrementAndDelayedLogging}>Delayed Logging</button>
      <p>
        {stateNumber} {Refnumber.current}
      </p>
    </>
  );
};

export default RefComponent;
