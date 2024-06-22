// src/components/NumericInput.jsx
import React from 'react';
import './NumericInput.css';

const NumericInput = ({ label, value, onChange, min, max, step, unit, placeholder }) => {
  return (
    <div className="numericinput-container">
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} min={min} max={max} step={step} placeholder={placeholder} />
      {unit && <span>{unit}</span>}
    </div>
  );
};

export default NumericInput;
