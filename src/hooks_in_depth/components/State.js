/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#usestate
 */

import { useState } from 'react';

const StateComponent = () => {
  const [isGreen, setIsGreen] = useState(true);

  return (
    // eslint-disable-next-line
    <h1
      title="Click on me :)"
      onClick={() => setIsGreen(!isGreen)}
      style={{ color: isGreen ? 'limegreen' : 'crimson', cursor: 'pointer' }}
    >
      useState Example
    </h1>
  );
};

export default StateComponent;
