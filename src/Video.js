import React, { useState, useCallback } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import YouTube from 'react-youtube';
import './styles/Video.css';

function Video(props) {

  return (
    <div className="Video">

        <div className="sub">
            <h3>AutoPilot Drone Simulation</h3>
        </div>

        <div className="video-container">
            <YouTube 
                videoId={"BuCPArnjP_U"}
                opts = {
                    {height: '500',
                    width: '940'}
                }
                > 
            </YouTube>
        </div>
        

    </div>
  );
}

export default Video;