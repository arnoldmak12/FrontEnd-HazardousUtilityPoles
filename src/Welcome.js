import React, { useState, useCallback } from 'react';
import './styles/Welcome.css';

function Welcome(props) {

  return (
    <div className="welcome">

      <div className="content-header-container">

          <p className="content-header">Welcome to the Utility Pole Saftey Evaluater</p>

      </div>

      <div className="content-body-container">

          <p className="content-body">
          This Application will identify the saftey of specific utility poles that the drone will take pictures of.
           To begin, click "Next" and follow along to observe the results.
          </p>

      </div>

    </div>
  );
}

export default Welcome;