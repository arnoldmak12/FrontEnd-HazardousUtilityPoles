import React, { useState, useCallback } from 'react';
import InfoWindow from './InfoWindow';

// Marker component
function Marker(props) {
    let markerStyle = {
      border: '1px solid white',
      borderRadius: '50%',
      height: 15,
      width: 15,
      backgroundColor: backgroundColor(),
      cursor: 'pointer',
      zIndex: 10,
    };

    function backgroundColor(){
        if(props.lean > 10){
            return 'red'
        } else if(props.lean > 5){
            return 'orange'
        }else if(props.lean > 2.5){
            return 'yellow'
        }else {
            return 'green'
    }
    }
    

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