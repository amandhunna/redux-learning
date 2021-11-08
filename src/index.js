
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