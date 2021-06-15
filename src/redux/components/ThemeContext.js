import { createContext } from 'react';

// Using a hook (useState) inside the context so we can update it
// Writting it down for TS to get the types, but it's not actually needed as the functionality
// comes from the useState hook in App.js
const ThemeContext = createContext(['green', function () {}]);

export default ThemeContext;
