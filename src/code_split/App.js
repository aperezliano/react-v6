/**
 * Docs Lazy: https://reactjs.org/docs/code-splitting.html#reactlazy
 * Docs Suspense: https://reactjs.org/docs/react-api.html#reactsuspense
 */

import { StrictMode, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { render } from 'react-dom';

import ThemeContext from './components/ThemeContext';

// Lazy Loading components (using dynamic import)
const Details = lazy(() => import('./pages/Details'));
const SearchParams = lazy(() => import('./pages/SearchParams'));

/*
  A <Switch> looks through all its children <Route>
  elements and renders the first one whose path
  matches the current URL. Use a <Switch> any time
  you have multiple routes, but you want only one
  of them to render at a time
*/

const App = () => {
  // Setting the theme inside the state (hook)
  const themeHook = useState('darkblue');
  return (
    // Wrapping the whole app with the context provider so all the components get access to the theme
    <ThemeContext.Provider value={themeHook}>
      <div id="main-app">
        {/* With Suspense we are waiting for the dynamic imports */}
        <Suspense fallback={<h2>Loading Route...</h2>}>
          <Router>
            <header>
              <Link to="/">
                <h1>JSX!</h1>
              </Link>
            </header>
            <Switch>
              <Route path="/details/:id">
                <Details />
              </Route>
              <Route path="/">
                <SearchParams />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

// Using Strict Mode just for learning purposes
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
