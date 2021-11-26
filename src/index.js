
import './index.css';
import React from 'react';
import { Provider } from 'react-redux';
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
