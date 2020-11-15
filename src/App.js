import React, { useState } from 'react';
import MultiView from './MultiView';
import Welcome from './Welcome';
import './styles/App.css';
import Upload from './Upload';
import Video from './Video';


function App() {
  
  const [count, setCount] = useState(0);
  const [fileJpg, setfileJpg] = useState(false);
  const [fileJson, setfileJson] = useState(false);
  const MAX = 3;

  return (
    <div className="App">
      
      <div className="main-header-container">
          <p className="main-header">Title</p>
      </div>

      <div className="content-container">

              {"Count: " + count}
              <br></br>
              
              {(count === 0 ? <Welcome></Welcome> : null)} 

              {count === 1 ? 
              <Upload 
                onSubmitJpg={(fileJpgs) => setfileJpg(fileJpgs)}  
                onSubmitJson={(fileJson) => setfileJson(fileJson)}>
              </Upload> : null}

              <br></br>

              {count === 2 ? <Video></Video> : null}

              {count === 3 ? <MultiView fileJpg={fileJpg} fileJson={fileJson}></MultiView> : null}

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
