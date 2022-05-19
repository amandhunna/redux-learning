import React from 'react';
import { actions } from './store';
import { connect } from 'react-redux';
import { fetchProduct } from './action';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
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

  const Product = ({id}) => {
    if(!id) {
      return "NO PRODUCT Found";
    }
    const productList = Object.entries(product[id]);
    return productList.map(([key, value]) => {
      const liKey = `${key}${value}`
      return <li key={liKey}><span>{key}</span>:<strong>{value}</strong></li>
    });
  }

  const ProductList = () => {
    const items = Object.values(product);
    return items.map(({id}) => <Product key={`product-${id}`} id={id} />)
  }

  const pageCount = () => {
    if(!count) return "No product selected click next product"
    return count;
  }

  const style = { ...product[count]?.color ? { backgroundColor: product[count].color} : {} };


  const Home = () => (
    <header className="App-header" style={style}>
    <p>
     Product id: {pageCount()}
    </p>
    <p>
     <Product id={count}/>
    </p>
    <section>
      <button onClick={onResetClick}>Reset</button>
      <button onClick={onFetchProduct}>Next Product</button>
    </section>
    <Link to="/all">All products</Link>
    </header>
  );
  const AllProducts = () => (
    <section>
      <span>All fetch products</span>
      <p>
        <ProductList />
      </p>
      <Link to="/">Home</Link>
    </section>);

  const NoPage =() => <section>No page found. <Link to="/">Home</Link> <Link to="/all">All products</Link></section>


  return (
     <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all" element={<AllProducts />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
     </div>
    
  );
}

/* filter the states to pass as props */
const mapStateToProps = state => { return state };

export default connect(mapStateToProps/* map states to props, map dispatch to props */)(App);

