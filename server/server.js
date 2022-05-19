import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { store } from "./createStore";
import { Provider } from 'react-redux';
import App from "../src/App";

const PORT = 8000;

const app = express();



app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    
    const content = renderToString(
      <StaticRouter location={req.path} context={{}}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    );
      console.log(data);
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<html>
        <head>
        </head>
        <body>
          <h1> I am ssr page </h1>
          <div id="root">${content}</div>
          <script>
            window.INITIAL_STATE = ${serialize(store.getState())}
          </script>
          <script src="bundle.js"></script>
        </body>
      </html>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});