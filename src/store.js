import { createStore } from "redux";

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

export const store = createStore(reducer);