import React, { useState } from 'react';
import MultiView from './MultiView';
import Select from './Select';
import './styles/App.css';
import Upload from './Upload';
import Video from './Video';

// const singlePath = [<Select/>]

function App() {
  
  const [count, setCount] = useState(0);
  const [single, setSingle] = useState(false);
  const [file, setFile] = useState(false);
  const [sample, setSample] = useState(false);
  const MAX = 3;

  return (
    <div className="App">
      
      <div className="main-header-container">
          <p className="main-header">Title</p>
      </div>

      <div className="content-container">

              {"Count: " + count}
              <br></br>
              {"Single: " + single}
              
              {(count === 0 ? <Select onClick={(x) => setSingle(x)}></Select> : null) /* This will allow for selection of 1 or multiple utility poles */} 

              {count === 1 ? <Upload single={single} onSubmit={(files) => setFile(files)} useSample={() => setSample(!sample)}></Upload> : null}

              <br></br>

              {count === 2 ? <Video></Video> : null}

              {(count === 3 && !single) ? <MultiView></MultiView> : null}

              {/* {count === 2 ? console.log("sample is "+ sample) + " Sample: " + {sample} : null} */}
      </div>

      <div className="button-container">
          <button className="previous" onClick={() => setCount(count - 1)} hidden={count === 0 ? true : false}>Previous</button>
          <button className="next" onClick={() => setCount(count + 1)} hidden={count === MAX ? true : false}>Next</button>
      </div>

    </div>
  );
}

export default App;
