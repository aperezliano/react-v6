import { render } from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Details from './pages/Details';
import SearchParams from './pages/SearchParams';

/*
  A <Switch> looks through all its children <Route>
  elements and renders the first one whose path
  matches the current URL. Use a <Switch> any time
  you have multiple routes, but you want only one
  of them to render at a time
*/

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

// Using Strict Mode just for learning purposes
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
