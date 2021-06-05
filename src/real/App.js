import { render } from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Details from './pages/Details';
import SearchParams from './pages/SearchParams';
import ErrorBoundary from './components/ErrorBoundary';

/*
  A <Switch> looks through all its children <Route>
  elements and renders the first one whose path
  matches the current URL. Use a <Switch> any time
  you have multiple routes, but you want only one
  of them to render at a time
*/

const App = () => (
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
);

// Using Strict Mode just for learning purposes
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
