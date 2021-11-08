import React from 'react';
import { actions } from './store';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

// connect

function Counter(props) {
  const { count, increment} = props;
  // console.log(props); { count: 0, dispatch }

  const onIncClick = () => {
    props.dispatch({type: actions.inc});
  }

  const onResetClick = () => {
    props.dispatch({type: actions.reset});
  }

  const onDecClick = () => {
    props.dispatch({type: actions.dec});
  }



  return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
          count: {count}
         </p>
         <section>
           <button onClick={onIncClick}>Inc</button>
           <button onClick={onDecClick}>Dec</button>
           <button onClick={onResetClick}>Reset</button>
         </section>
       </header>
     </div>
    
  );
}

/* filter the states to pass as props */
const mapStateToProps = state => { return state };

const mapDispatchToProps = (dispatch) => {
/*   return {
    increment() {
      dispatch(incrementValue())
    }
  } */
}

// export default Counter
export default connect(mapStateToProps/* map states to props, map dispatch to props */)(Counter);

