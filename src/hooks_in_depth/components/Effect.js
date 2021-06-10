/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#useeffect
 */

import { useState, useEffect } from 'react';

const EffectComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timerId);
  }, [time]);
  // If we set an empty array ([]) useEffect is only triggered once
  // If we don't set the 2nd parameter, useEffect is triggerend on every render

  return (
    <>
      <h1> useEffect Example </h1>
      <h2>{time.toLocaleTimeString()}</h2>
    </>
  );
};

export default EffectComponent;
