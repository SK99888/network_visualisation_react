import React from 'react';
import './purple_component.css';
import OrangeCompartment from './orange_component';

const PurpleCompartment = () => {
  return (
    <div className="purple-compartment">
      <OrangeCompartment />
    </div>
  );
};

export default PurpleCompartment;
