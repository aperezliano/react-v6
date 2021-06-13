import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import App from '../App';

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync('dist/index.html').toString();
// We need to split the html by the text inside the div with id = "root"
// So we can render inside that div
const parts = html.split('not rendered');
const app = express();

app.use('/dist', express.static('dist'));
app.use((req, res) => {
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  res.status(staticContext.statusCode || 200);
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`).end();
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
