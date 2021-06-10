/**
 * Doc: https://reactjs.org/docs/hooks-reference.html#usecontext
 */
import { useState, useContext, createContext } from 'react';

const UserContext = createContext([
  // Using a hook (useState) inside the context so we can update it
  // Writting them down for TS to get the types, but it's not actually needed as the functionality
  // comes from the useState hook down in ContextComponent
  {
    firstName: 'Bob',
    lastName: 'Bobberson',
    suffix: 1,
    email: 'bobbobberson@example.com',
  },
  (e) => e,
]);

const LevelFive = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <h5>Level Five</h5>
      <p>
        {user.firstName} {user.lastName} {user.suffix}
      </p>
      <button onClick={() => setUser({ ...user, suffix: user.suffix + 1 })}>
        Increase!
      </button>
    </>
  );
};
const LevelFour = () => (
  <>
    <h4>Level Four</h4>
    <LevelFive />
  </>
);
const LevelThree = () => (
  <>
    <h3>Level One</h3>
    <LevelFour />
  </>
);
const LevelTwo = () => (
  <>
    <h2>Level Two</h2>
    <LevelThree />
  </>
);
const LevelOne = () => (
  <>
    <h1>Level One</h1>
    <LevelTwo />
  </>
);

const ContextComponent = () => {
  const userState = useState({
    firstName: 'Bob',
    lastName: 'Bobberson',
    suffix: 1,
    email: 'bobbobberson@example.com',
  });
  return (
    <UserContext.Provider value={userState}>
      <h1>useContext Example</h1>
      <LevelOne />
    </UserContext.Provider>
  );
};

export default ContextComponent;
