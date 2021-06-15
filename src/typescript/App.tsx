import { render } from 'react-dom';
import { StrictMode, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Details from './pages/Details';
import SearchParams from './pages/SearchParams';
import ThemeContext from './components/ThemeContext';

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
