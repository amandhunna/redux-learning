import React from 'react';
import { actions } from './store';
import { connect } from 'react-redux';
import logo from './logo.svg';
import { fetchTweets } from './action';
import image from "./testImage.jpeg";
import text from "./lorem";
import car from "./car.jpeg";
import './App.css';

// connect

function Counter(props) {
  const { count, dispatch } = props;
  console.log(props); //{ count: 0, dispatch }

  const onIncClick = () => {
    dispatch({type: actions.inc});
  }

  const onResetClick = () => {
    dispatch({type: actions.reset});
  }

  const onDecClick = () => {
    dispatch({type: actions.dec});
  }

  const onConsoleClick = () => {
    dispatch(fetchTweets());
  }

  return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
          count: {count} {text}
          <image src={image} alt="text" />
          <image src={car} alt="car" />
          
         </p>
         <section>
           <button onClick={onIncClick}>Inc</button>
           <button onClick={onDecClick}>Dec</button>
           <button onClick={onResetClick}>Reset</button>
           <button onClick={onConsoleClick}>Click console</button>
         </section>
       </header>
     </div>
    
  );
}

/* filter the states to pass as props */
const mapStateToProps = state => { return state };

/*
const mapDispatchToProps = (dispatch) => {
   return {
    increment() {
      dispatch(incrementValue())
    }
  } 
}
*/

// export default Counter
export default connect(mapStateToProps/* map states to props, map dispatch to props */)(Counter);

