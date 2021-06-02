import { render } from 'react-dom';
import { StrictMode } from 'react';
import SearchParams from './components/SearchParams';

const App = () => (
  <div id="main-app">
    <h1>JSX!</h1>
    <SearchParams />
  </div>
);

// Using Strict Mode just for learning purposes
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
