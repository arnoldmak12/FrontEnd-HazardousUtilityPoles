import React, { useState, useCallback } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import YouTube from 'react-youtube';
import './styles/Video.css';

function Video(props) {

  return (
    <div className="Video">

        <YouTube 
        videoId={"BuCPArnjP_U"}
        opts = {
            {height: '600',
            width: '940'}
        }
        > </YouTube>

    </div>
  );
}

export default Video;