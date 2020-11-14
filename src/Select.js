import React, { useState, useCallback } from 'react';
// import './Select.css';

function Select(props) {

let single;

const onClick = useCallback((selection) => {
    single = (selection === "one");
    props.onClick(single);
  }
)

  return (
    <div className="Select">

      <div className="content-header-container">
          <p className="content-header">How many utility poles would you like to check? Choose an Option</p>
      </div>

          <button className="one" onClick={() => onClick("one")}>one</button>
          <button className="all" onClick={() => onClick("all")}>multiple</button>
    </div>
  );
}

export default Select;