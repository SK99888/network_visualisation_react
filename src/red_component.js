import React from 'react';
import './red_component.css';
import BlackCompartment from './black_component';

const RedSquare = () => {
  return (
    <div className="red-square">
      <BlackCompartment />
    </div>
  );
};

export default RedSquare;
