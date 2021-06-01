import ReactDOM from 'react-dom';
import Pet from './components/Pet';
import SearchParams from './components/SearchParams';

const App = () => (
  <div id="main-app">
    <h1>JSX!</h1>
    <SearchParams />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
