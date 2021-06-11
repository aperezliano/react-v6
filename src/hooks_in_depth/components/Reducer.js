/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#usereducer
 */

import { useReducer } from 'react';

const limitRGB = (num) => Math.abs(num) % 255;
const STEP = 50;
const ACTIONS = {
  incrementR: 'INCREMENT_R',
  decrementR: 'DECREMENT_R',
  incrementG: 'INCREMENT_G',
  decrementG: 'DECREMENT_G',
  incrementB: 'INCREMENT_B',
  decrementB: 'DECREMENT_B',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.incrementR:
      return { ...state, r: limitRGB(state.r + STEP) };
    case ACTIONS.decrementR:
      return { ...state, r: limitRGB(state.r - STEP) };
    case ACTIONS.incrementG:
      return { ...state, g: limitRGB(state.g + STEP) };
    case ACTIONS.decrementG:
      return { ...state, g: limitRGB(state.g - STEP) };
    case ACTIONS.incrementB:
      return { ...state, b: limitRGB(state.b + STEP) };
    case ACTIONS.decrementB:
      return { ...state, b: limitRGB(state.b - STEP) };
    default:
      return state;
  }
};

const ReducerComponent = () => {
  const [{ r, b, g }, dispatch] = useReducer(reducer, { r: 0, g: 0, b: 0 });
  return (
    <>
      <h1 style={{ color: `rgb(${r},${g},${b})` }}>useReducer Example</h1>
      <div>
        <span>r</span>
        <button onClick={() => dispatch({ type: ACTIONS.decrementR })}>
          -
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.incrementR })}>
          +
        </button>
      </div>
      <div>
        <span>g</span>
        <button onClick={() => dispatch({ type: ACTIONS.decrementG })}>
          -
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.incrementG })}>
          +
        </button>
      </div>
      <div>
        <span>b</span>
        <button onClick={() => dispatch({ type: ACTIONS.decrementB })}>
          -
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.incrementB })}>
          +
        </button>
      </div>
    </>
  );
};

export default ReducerComponent;
