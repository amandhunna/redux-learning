import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

// connect

function Counter(props) {
  const { count, increment} = props;
  // console.log(props); { count: 0, dispatch }

  return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
          count: {count}
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

