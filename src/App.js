import React from 'react';
import { actions } from './store';
import { connect } from 'react-redux';
import { fetchProduct } from './action';
import './App.css';

function App(props) {
  const { count, product, dispatch } = props;
  // console.log(props); //{ count: 0, dispatch }

  const onResetClick = () => {
    dispatch({type: actions.reset});
  }

  const onFetchProduct = () => {
    dispatch(fetchProduct());
  }

  const renderProducts = () => {
    if(!count) {
      return "NO PRODUCT FETCHED";
    }
    const productList = Object.entries(product[count]);

    
    return productList.map(([key, value]) => {
      const liKey = `${key}${value}`
      return <li key={liKey}><span>{key}</span>:<strong>{value}</strong></li>
    });
  }

  const pageCount = () => {
    if(!count) return "No product selected click next product"
    return count;
  }

  const style = { ...product[count]?.color ? { backgroundColor: product[count].color} : {} };

  return (
     <div className="App">
       <header className="App-header" style={style}>
         <p>
          Product id: {pageCount()}
         </p>
         <p>
          {renderProducts()}
         </p>
         <section>
           <button onClick={onResetClick}>Reset</button>
           <button onClick={onFetchProduct}>Next Product</button>
         </section>
       </header>
     </div>
    
  );
}

/* filter the states to pass as props */
const mapStateToProps = state => { return state };

export default connect(mapStateToProps/* map states to props, map dispatch to props */)(App);

