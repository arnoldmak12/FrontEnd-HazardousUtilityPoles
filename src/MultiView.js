import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Mapping/Marker';
import axios from 'axios';
import InfoWindow from './Mapping/InfoWindow';
import sampleJpg from './SampleDataSingle/000140-frontleft-e91e9c57-04f3-4849-8bc0-c043107b94d2-31.jpg' ;
import * as fs from 'fs';
import FormData from 'form-data'
import $ from 'jquery'
import { render } from '@testing-library/react';
// var fs = require('fs');
// import './MultiView.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

var data = new FormData();
// data.append('image', fs.createReadStream('./SampleDataSingle/000140-frontleft-e91e9c57-04f3-4849-8bc0-c043107b94d2-31.jpg'));

function MultiView(props) {

    let [clicked, setClicked] = useState([]);
    let [markers, setMarkers] = useState([]);
    let longs = [];

    useEffect(async () => {


        console.log("JPG: "+ props.fileJpg[0].name);

        let data = new FormData();


        props.fileJpg.map((fileJpg) => {

            data = new FormData();
            data.append("image", fileJpg);

            $.ajax({
                url: 'http://18.191.45.207:5000/api/models/predict/pole',
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    let i =0;
                    while(i < props.fileJson.length) {

                        let bounds = data["1"][2][0];
                        let original = JSON.stringify(props.fileJson[i]);
                        let urlIndex = original.indexOf("image_url") - 1;
                        let endIndex = original.substring(urlIndex).indexOf(".jpg") + 5; //length of string
                        let urlstring = original.substring(urlIndex, (original.indexOf(".jpg")+5));
                        let url = urlstring.substring(14).slice(0, -1);

                        // console.log(bounds);

                        if(url.indexOf(props.fileJpg[0].name) !==  -1) {
                            // console.log("SAMe");
                            // props.fileJson[i] = props.fileJson[i].concat(bounds);
                            try {
                                props.fileJson[i] = JSON.parse(props.fileJson[i]);
                            }catch(err){
                                console.log(err);
                            }
                            
                            props.fileJson[i].bounded_box = bounds;
                            // console.log(props.fileJson[i])

                            let data2 = new FormData();

                            data2 = new FormData();
                                    data2.append("pole", JSON.stringify(props.fileJson[i]["pole"]));
                                    data2.append("image", JSON.stringify(props.fileJson[i]["image"]));
                                    data2.append("esri_data", JSON.stringify(props.fileJson[i]["esri_data"]));
                                    data2.append("bounded_box", JSON.stringify(props.fileJson[i]["bounded_box"]));

                                    let lat = props.fileJson[i]["pole"]["coordinates"][1];
                                    let lng = props.fileJson[i]["pole"]["coordinates"][0];
                                    
                                    leanAPI(lng, lat);

                                    async function leanAPI(lng, lat){
                                        $.ajax({
                                            url: 'https://lean-calculator.herokuapp.com/api',
                                            data: data2,
                                            processData: false,
                                            contentType: false,
                                            type: 'POST',
                                            success: function(data){

                                                let marker = [ 
                                                    lng, 
                                                    lat, 
                                                    data]

                                                    console.log(marker)


                                                    try{
                                                        console.log(markers.indexOf(marker[0]));

                                                        if(longs.indexOf(marker[0]) !== -1 || markers.length === 0){
                                                            let temp = [marker]
                                                            setMarkers(markers.concat(temp));
                                                            longs.push(marker[0]);
                                                        }
                                                }catch(err){console.log(err)}
                                                console.log("markers: "+markers)
                                            },
                                            error: function(xhr, status, error) {
                                                alert("error");
                                            }
                                        });
                                    }


                                    props.fileJson[i] = JSON.stringify(props.fileJson[i])
                        }

                        i++;
                    }

                    // console.log(data);
                },
                error: function(xhr, status, error) {
                    alert("error");
                }
              });
        })

      }, [markers]);

    let id =1234;

    let center = {
        lat: 39.98938095928276,
        lng: -83.06166551758234
      }

  return (
    <div className="MultiView">
multi   {markers.length}
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
                { markers.length !== 0 && markers.map((marker, i) => {

                        console.log("markeR: " + marker[0])    
                        return(
                            <Marker
                                key={i}
                                lat={marker[1]}
                                lng={marker[0]}
                                show={clicked.indexOf(id) !== -1}
                                place={marker + "has lean of " + marker[2]}
                                onClick={() => {clicked.indexOf(id) !== -1 ? setClicked([]) : setClicked(clicked.concat(id))}}
                            />)
                    })
                }
                 
              {console.log("markers: " + markers)}
              {console.log(clicked)}
            </GoogleMapReact>
        </div>
    </div>
  );
}

export default MultiView;