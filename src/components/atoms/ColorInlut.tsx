import React from "react";

interface ColorInputProps {
  label: string;
  value: string;
  name: string;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="color" name={name} defaultValue={value} />
    </div>
  );
};

export default ColorInput;
