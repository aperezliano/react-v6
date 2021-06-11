/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */

// useLayoutEffect makes the function to be run by React INMEDIATELY after render finishes
// useEffect doesn't guarantee the execution time, only that it's scheduled to be run
import { useLayoutEffect, useState, useRef } from 'react';

const LayoutComponent = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const el = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    setHeight(el.current.clientHeight);
    setWidth(el.current.clientWidth);
  });

  return (
    <>
      <h1>useLayoutEffect Example</h1>
      <h2>textarea width: {width}px</h2>
      <h2>textarea height: {height}px</h2>
      <textarea
        onClick={() => {
          setWidth(0);
        }}
        // using ref = {el} we ensure that the reference is always the textare rendered on the screen
        ref={el}
      />
    </>
  );
};

export default LayoutComponent;
