import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Here goes all client side related stuff (Google Analytics, etc...)

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
