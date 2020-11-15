import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
// import './Upload.css';

function Upload(props) {

    const [sample, setSample] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);

        let i;
        let json_files = [];
        let jpg_files = [];

        for(i=0; i < acceptedFiles.length; i++){
            
            if(acceptedFiles[i].type === "application/json"){
                let fileJson = [];
                // props.onSubmitJson(acceptedFiles);
                // console.log(acceptedFiles);

                const reader = new FileReader()
                
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                
                reader.onload = () => {
                // Do whatever you want with the file contents
                  const binaryStr = reader.result
                  fileJson.push(binaryStr); 
                };
                // reader.readAsArrayBuffer(file);
                reader.readAsText(acceptedFiles[i]);

                // console.log(fileJson);
                json_files.push(fileJson)
            }
            else{
                jpg_files.push(acceptedFiles[i])
            }
        }

        // console.log("JSON FILES: " + json_files);
        // console.log("JPGFILES: " + jpg_files);

        props.onSubmitJson(json_files);
        props.onSubmitJpg(jpg_files);

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
                <p>Upload All JPGs and thier corressponding JSON</p>
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