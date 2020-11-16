import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import './styles/Upload.css';

function Upload(props) {

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

        alert("Successfully Uploaded " + (json_files.length + jpg_files.length) + " Files")

        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
      <div className="upload-container">
            <div className="dropzone-container" {...getRootProps()} >
                    <input className="input"{...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Upload All JPGs and Corresponding JSON Here</p>
                    }
            </div>

            <div className="sample-container">
                <a href="https://github.com/arnoldmak12/FrontEnd-HazardousUtilityPoles/tree/master/public" target="_blank">Sample Data Available Here</a>
            </div>
    
        </div>
  );
}

export default Upload;