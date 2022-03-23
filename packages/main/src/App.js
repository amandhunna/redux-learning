import LibContext from '@aman/lib';
import logo from './logo.svg';
import MainContext from "./Context";
import Anchor from "./Anchor"
import { formatDate } from "@aman/utils";
import { Routes, Route } from "react-router-dom";
import './App.css';

import ATag from "./ATag";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <MainContext.Provider value={{ contextType: "updated" }}>
          <LibContext.Provider value={{contextType: "updated"}}>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  {formatDate()}{console.log("---loaded-/")}
                </p>
                <Anchor />
              </header>
            </div>
          </LibContext.Provider>
        </MainContext.Provider>} />
        <Route path="/c" element={
          <div style={{
            height: "100vh", 
            width: "100vw",
            background: "red"
          }}> {formatDate()}{console.log("-im loaded but not ATag-")}<ATag/></div>} />
    </Routes>
  );
}

export default App;
