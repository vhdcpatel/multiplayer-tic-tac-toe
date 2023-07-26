import React from 'react';
import "./Square.css";

const Square = ({ chooseSquare, currentVal}) => {
  return (
    <div className='square' onClick={chooseSquare}>
      {currentVal}
    </div>
  )
}

export default Square