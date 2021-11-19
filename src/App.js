import React from "react";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);


  const initTheme = () => {
        // reference: https://web.dev/prefers-color-scheme/
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
          console.log('🎉 Dark mode is supported');
        } else {
          return;
        }
    
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // const { matches: isDarkMode } = darkModeMediaQuery;

        // attach on theme change event
        darkModeMediaQuery.onchange = () => {
          console.log("----", "change---");
        }
  }

  React.useEffect(() => {
    initTheme();
  }, []);
  
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}

export default App;
