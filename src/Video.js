import React, { useState, useCallback } from 'react';
import "../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
// import './Video.css';

function Video(props) {

  return (
    <div className="Video">
        <Player
            playsInline
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        />
    </div>
  );
}

export default Video;