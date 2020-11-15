import React, { useState } from 'react';


// InfoWindow component
const InfoWindow = (props) => {
    const { lat, lng, lean, image } = props;
    const infoWindowStyle = {
      position: 'relative',
      bottom: 150,
      left: '-45px',
      width: 220,
      backgroundColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      padding: 10,
      fontSize: 14,
      zIndex: 100,
    };
  
    return (
      <div style={infoWindowStyle}>
        <strong>Latitude: </strong>{lat.toFixed(3)}
        <br></br>
        <strong>Longitude: </strong> {lng.toFixed(3)}
        <br></br>
        <strong>Lean: </strong> {lean.toFixed(3)}
        <br></br>
        <a href={image} target="_blank"> <strong>Link to Photo </strong> </a>
      </div>
    );
  };

    export default InfoWindow;