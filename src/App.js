import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const initialState = {
  count: 0,
}

const actions = {
  inc: "INCREMENT"
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  if(type === actions.inc) {
    return {
      count: state.count + 1,
    };
  }

  return state;
}

const store = createStore(reducer);


function Counter() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         count: 
        </p>
        <section>
          <button>Inc</button>
          <button>Dec</button>
          <button>Reset</button>
        </section>
      </header>
    </div>
  );
}

export default Counter;
