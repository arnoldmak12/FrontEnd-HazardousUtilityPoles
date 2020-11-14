import React, { useState, useCallback } from 'react';
import InfoWindow from './InfoWindow';

// Marker component
function Marker(props) {
    const markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 15,
      width: 15,
      backgroundColor: props.show ? 'red' : 'blue',
      cursor: 'pointer',
      zIndex: 10,
    };


    const onClick = useCallback => {
        props.onClick();
      }
    

    return (
      <>
        <div style={markerStyle} onClick={() => onClick()}/>
        {/* {console.log(props.show)} */}
        {props.show && <InfoWindow place={props.place} />}
      </>
    );
  };

  export default Marker;