import React, { useState, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Mapping/Marker';
import InfoWindow from './Mapping/InfoWindow';
// import './MultiView.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function MultiView(props) {

    let id =1234;

    let center = {
        lat: 39.98938095928276,
        lng: -83.06166551758234
      }

      const [clicked, setClicked] = useState([]);

  return (
    <div className="MultiView">
multi
        <div className="map-container" style={{width: "100%", height: "600px", background: "blue"}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBB9ls28E032E2Y_SM0w990xtohd_crKHk" }}
                defaultCenter={center}
                defaultZoom={11}
                >
                {/* <AnyReactComponent
                    lat={center.lat}
                    lng={center.lng}
                    text="My Marker"
                /> */}
                 <Marker
                key={id}
                lat={center.lat}
                lng={center.lng}
                show={clicked.indexOf(id) !== -1}
                place={"test"}
                onClick={() => {clicked.indexOf(id) !== -1 ? setClicked([]) : setClicked(clicked.concat(id))}}
                
              />{console.log(clicked)}
            </GoogleMapReact>
        </div>
    </div>
  );
}

export default MultiView;