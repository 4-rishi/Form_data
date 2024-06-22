// src/components/Checkbox.jsx
import React from 'react';
import './Checkbox.css';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <label>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
