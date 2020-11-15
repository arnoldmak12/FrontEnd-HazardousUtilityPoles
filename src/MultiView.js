import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Mapping/Marker';
import FormData from 'form-data'
import $ from 'jquery'
// var fs = require('fs');
// import './MultiView.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

var data = new FormData();
// data.append('image', fs.createReadStream('./SampleDataSingle/000140-frontleft-e91e9c57-04f3-4849-8bc0-c043107b94d2-31.jpg'));
let first = true;

function MultiView(props) {

    let [clicked, setClicked] = useState([]);
    let [markers, setMarkers] = useState([]);
    let longs = [];
    

    useEffect( () => {

        if(!first) { return }
        // console.log("JPG: "+ props.fileJpg[0].name);

        let data = new FormData();

        let i = 0;

        props.fileJpg.map((fileJpg) => {

            data = new FormData();
            data.append("image", fileJpg);

            console.log(fileJpg);
            
            $.ajax({
                url: 'http://18.191.45.207:5000/api/models/predict/pole',
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    
                    let j = 0;

                    while(j < props.fileJson.length) {

                        let bounds = data["1"][2][0];
                        let original = JSON.stringify(props.fileJson[j]);
                        let urlIndex = original.indexOf("image_url") - 1;
                        let endIndex = original.substring(urlIndex).indexOf(".jpg") + 5; //length of string
                        let urlstring = original.substring(urlIndex, (original.indexOf(".jpg")+5));
                        let url = urlstring.substring(14).slice(0, -1);

                        console.log("iteration: "+i);
                        console.log("URL "+url);
                        console.log("FILE NAME "+props.fileJpg[i].name);

                        if(url.indexOf(props.fileJpg[i].name) !==  -1) {
                            
                            // console.log("SAMe");
                            // props.fileJson[i] = props.fileJson[i].concat(bounds);
                            try {
                                props.fileJson[j] = JSON.parse(props.fileJson[j]);
                            }catch(err){
                                console.log(err);
                            }
                            
                            props.fileJson[j].bounded_box = bounds;
                            // console.log(props.fileJson[i])

                            let data2 = new FormData();

                            data2 = new FormData();
                                    data2.append("pole", JSON.stringify(props.fileJson[j]["pole"]));
                                    data2.append("image", JSON.stringify(props.fileJson[j]["image"]));
                                    data2.append("esri_data", JSON.stringify(props.fileJson[j]["esri_data"]));
                                    data2.append("bounded_box", JSON.stringify(props.fileJson[j]["bounded_box"]));

                                    let lat = props.fileJson[j]["pole"]["coordinates"][1];
                                    let lng = props.fileJson[j]["pole"]["coordinates"][0];
                                    let image = props.fileJson[j]["image"]["image_url"];

                                    leanAPI(lng, lat, image);

                                    i++;

                                    async function leanAPI(lng, lat, image){
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
                                                    data,
                                                    image]

                                                    console.log(marker)

                                                    try{
                                                        // console.log("OLD LONGS: "+longs)
                                                        // console.log("CURRENT LNG: "+ marker[0])
                                                        // console.log(longs.indexOf(marker[0]) === -1|| longs.length === 0)
                                                        if(longs.indexOf(marker[0]) === -1 || longs.length === 0){
                                                            let temp = [marker]

                                                            console.log("Old Markers: " + markers)

                                                            setMarkers(markers => temp.concat(markers));

                                                            console.log("New Markers: " + markers)

                                                            longs.push(marker[0]);
                                                            console.log("NEW LONGS: "+longs)
                                                        }
                                                }catch(err){console.log(err)}
                                                // console.log("markers: "+markers)
                                            },
                                            error: function(xhr, status, error) {
                                                alert("error");
                                            }
                                            
                                        });
                                    }


                                    props.fileJson[j] = JSON.stringify(props.fileJson[j])
                                    break;
                        }

                        j++;
                    }

                    // console.log(data);
                },
                error: function(xhr, status, error) {
                    alert("error");
                }
              });
              
        })
        first = false;
      }, [markers]);

    // let id =1234;

    let center = {
        lat: 39.98938095928276,
        lng: -83.06166551758234
      }

  return (
    <div className="MultiView">
        Markers: {markers.length}
        <div className="map-container" style={{width: "100%", height: "600px", background: "blue"}}>
            
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBB9ls28E032E2Y_SM0w990xtohd_crKHk" }}
                defaultCenter={center}
                defaultZoom={11}
                >

                { markers.length !== 0 && markers.map((marker, id) => {

                        let idArr = [id]

                        console.log("inside index: " +id);
                        console.log("clicked: " +clicked)

                        return(
                            <Marker
                                key={id}
                                lat={marker[1]}
                                lng={marker[0]}
                                lean={marker[2]}
                                image={marker[3]}
                                show={clicked.indexOf(id) !== -1}
                                onClick={() => {clicked.indexOf(id) !== -1 ? setClicked(clicked => clicked.splice(clicked.indexOf(id), 1)) : setClicked(clicked => idArr.concat(clicked))}}
                            />)
                    })
                }
                 
              {/* {console.log("markers: " + markers)} */}
              
            </GoogleMapReact>
        </div>
    </div>
  );
}

export default MultiView;