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

  const imgSet = {
    2: "http://www.nasa.gov/sites/default/files/thumbnails/image/187_1003705_americas_dxm.png",
    1: "https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png",
    0: "https://upload.wikimedia.org/wikipedia/en/0/00/Popeye_the_Sailor.png"
  }

  return (
    <main>
      <section>
      <em>On mac: go to settings => general => change appearences to light and dark</em>
      <p>{count}</p>
      <picture>
        <source srcSet={imgSet[0]} media="(prefers-color-scheme: dark)" />
        <source srcSet={imgSet[1]} media="(prefers-color-scheme: light)" />
        <img src={imgSet[2]} />
      </picture>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      </section>
      <section>
      <iframe src="http://localhost:8000/" height="100%" width="100%"
        title="W3Schools Free Online Web Tutorials"></iframe>
      </section>
    </main>
  );
}

export default App;
