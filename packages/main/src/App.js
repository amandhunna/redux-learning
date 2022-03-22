import LibContext from '@aman/lib';
import logo from './logo.svg';
import MainContext from "./Context";
import Anchor from "./Anchor"
import { formatDate } from "@aman/utils";
import './App.css';

function App() {
  return (
    <MainContext.Provider value={{ contextType: "updated" }}>
      <LibContext.Provider value={{contextType: "updated"}}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              {formatDate()}
            </p>
            <Anchor />
          </header>
        </div>
      </LibContext.Provider>
    </MainContext.Provider>
  );
}

export default App;
