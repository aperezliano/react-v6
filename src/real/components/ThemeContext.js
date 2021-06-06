import { createContext } from 'react';

// Using a hook inside the context so we can update it
const ThemeContext = createContext(['green', function () {}]);

export default ThemeContext;
