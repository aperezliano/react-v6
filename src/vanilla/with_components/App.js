const List = ({ type, text } = {}) =>
  React.createElement('div', { id: 'test-list' }, [
    React.createElement('h2', { key: 1, className: type }, text),
    React.createElement('h3', { key: 2, className: type }, text),
    React.createElement('h4', { key: 3, className: type }, text),
  ]);

const App = () =>
  React.createElement(
    'div',
    { id: 'test-id' },
    React.createElement('h1', {}, 'Vanilla 🍨'),
    React.createElement(List, { type: 'item', text: 'Item 1' }),
    React.createElement(List, { type: 'item', text: 'Item 2' }),
    React.createElement(List, { type: 'item', text: 'Item 3' })
  );

ReactDOM.render(React.createElement(App), document.getElementById('root'));
