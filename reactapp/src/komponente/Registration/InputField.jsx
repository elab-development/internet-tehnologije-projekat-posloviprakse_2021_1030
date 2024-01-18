import React from 'react';

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="input-group">
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
