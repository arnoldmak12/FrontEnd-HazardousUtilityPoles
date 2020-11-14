import React, { useState } from 'react';
import Select from './Select';
import './App.css';

// const singlePath = [<Select/>]

function App() {
  
  const [count, setCount] = useState(0);
  const [single, setSingle] = useState(true);
  const MAX = 10;



  return (
    <div className="App">
      

      <div className="main-header-container">
          <p className="main-header">Title</p>
      </div>

      <div className="content-container">

              {count}

              {single + " "}
              
              {(count === 0 ? <Select onClick={(x) => setSingle(x)}></Select> : null) /* This will allow for selection of 1 or all utility poles */} 

              {/* {singlePath[count]} */}
      </div>

      <div className="button-container">
          <button className="previous" onClick={() => setCount(count - 1)} hidden={count === 0 ? true : false}>Previous</button>
          <button className="next" onClick={() => setCount(count + 1)} hidden={count === MAX ? true : false}>Next</button>
      </div>

    </div>
  );
}

export default App;
