import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { PRODUCT_DETAIL } from "./action";

const initialState = {
    count: 0,
    product: {}
}
  
export  const actions = {
    reset: "RESET",
    PRODUCT_DETAIL,
  }
  
  const reducer = (state = initialState, action) => {
    const { type } = action;

    if(type === actions.PRODUCT_DETAIL) {
      return {
        ...state,
        count: state.count + 1,
        product: { ...state.product,  [action.payload.id]: { ...action.payload } },
      };
    }

    if(type === actions.reset) {
      return initialState;
    }
  
    return state;
  }

export const store = createStore(reducer, applyMiddleware(thunk))
