import React from 'react';
import './black_component.css';
import PurpleCompartment from './purple_component';

const BlackCompartment = () => {
  return (
    <div className="black-compartment">
      <PurpleCompartment />
    </div>
  );
};

export default BlackCompartment;
