import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { fetchTweets } from "./action";

const initialState = {
    count: 0,
}
  
export  const actions = {
    inc: "INCREMENT",
    dec: "DECREMENT",
    reset: "RESET"
  }
  
  const reducer = (state = initialState, action) => {
    const { type } = action;
    if(type === actions.inc) {
      return {
        count: state.count + 1,
      };
    }

    if(type === actions.dec) {
        return {
          count: state.count - 1,
        };
      }

      if(type === actions.reset) {
        return {
          count: 0,
        };
      }
  
    return state;
  }

export const store = createStore(reducer,applyMiddleware(thunk));
