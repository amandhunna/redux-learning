
import './index.css';
import App from './App';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { store } from './store';
import ReactDOM from 'react-dom';
import Counter from './App';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Counter />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

/* 
https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
https://stevekinney.github.io/redux-fundamentals/introduction-to-react-redux
https://react-redux.js.org/tutorials/connect
https://redux-observable.js.org/
https://static.frontendmasters.com/resources/2019-05-28-react-state/redux-mobx.pdf

middleware in context apis
https://medium.com/geekculture/middleware-function-for-contextapi-reducer-ab2e772da31f


normalize: separate everything out
*/