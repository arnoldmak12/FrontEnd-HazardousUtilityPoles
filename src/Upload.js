import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
// import './Upload.css';

function Upload(props) {

    const [sample, setSample] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        props.onSubmit(acceptedFiles);
        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const onClick = useCallback(() => {
        props.useSample(sample);
        } 
    )

  return (
    <div className="Upload">
          
          <div {...getRootProps()} style={{background: 'lightyellow'}}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Upload {props.single ? "One File": "Multiple Files"}</p>
            }
        </div>

        <div>
            <button onClick={function() {setSample(!sample); onClick();}}>
                {sample ? "Use My Data": "Use Sample Data"}    
            </button>
            {"Sample: " + sample}
        </div>
    </div>
  );
}

export default Upload;