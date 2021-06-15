# React v17 course

https://btholt.github.io/complete-intro-to-react-v6/

Turn me into a Monorepo, please... 🥺

## Vanilla

Super basic React in html, just to understand where the magic comes from 🧙🏿‍♂️

## Real

Example of a real page in React

## Hooks In Depth

Example of each kind of hook

## Tailwind

https://tailwindcss.com/
https://tailwindcss.com/docs

Same App as the one created in "Real" but using tailwind for styles

To start tailwind: `npx tailwindcss init`
Tailwind works with classNames

## Code Splitting

Example or the "Real" App with code splitted to improve page rendering times
Splitting code in such a small App incurres in more network latency, but with JS over 1Mb it makes sense

## Server Side Render

Example or the "Real" App rendered on server side
As we are going to "render" on the server (node) we need to ensure nothing client side related is called (like window - BrowserRouter uses it under the hood)

This implies modifying: App, ClientApp, Modal, index.html and package.json
New scripts:

```
    "build:client": "parcel build --public-url ./dist/ src/server_side_render/index.html",
    "build:server": "parcel build -d dist-server --target node server/index.js",
    "build:server_render": "npm run build:client && npm run build:server",
    "start:server_render": "npm -s run build && node dist-server/index.js",
```

## Tyescript

Migration of the "Real" app into TS

Remember to run `npx tsc --init` to generate the **tsconfig.json** file

## Redux

"Real" App with Redux
