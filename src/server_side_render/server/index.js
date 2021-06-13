import express from 'express';
// With stream we can start sending the client information as we get it
import { renderToNodeStream } from 'react-dom/server';
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
  res.write(parts[0]); // We already have this markup, so we can send it to the client :)
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.status(staticContext || 200);
    res.write(parts[1]);
    res.end();
  });

  // Not stream way of doing it:

  // res.status(staticContext.statusCode || 200);
  // res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`).end();
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
