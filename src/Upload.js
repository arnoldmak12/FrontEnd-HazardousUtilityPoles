import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
// import './Upload.css';

function Upload(props) {

    const [sample, setSample] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);

        if(acceptedFiles[0].type === "application/json"){
            let fileJson = [];
            // props.onSubmitJson(acceptedFiles);
            // console.log(acceptedFiles);

            acceptedFiles.forEach((file) => {
                const reader = new FileReader()
                
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                
                reader.onload = () => {
                // Do whatever you want with the file contents
                  const binaryStr = reader.result
                  fileJson.push(binaryStr); 
                };
                // reader.readAsArrayBuffer(file);
                reader.readAsText(file);
              })

              console.log(fileJson);
              props.onSubmitJson(fileJson);
        }
        else{
            props.onSubmitJpg(acceptedFiles);
        }
        

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
                <p>Drop the JPEG files here ...</p> :
                <p>Upload {props.single ? "One JPEG File": "Multiple JPEG Files"}</p>
            }
        </div>

        <div {...getRootProps()} style={{background: 'lightyellow'}}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the JSON files here ...</p> :
                <p>Upload {props.single ? "One JSON File": "Multiple JSON Files"}</p>
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