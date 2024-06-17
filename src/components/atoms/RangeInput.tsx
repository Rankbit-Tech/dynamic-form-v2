import React from "react";

interface RangeInputProps {
  label: string;
  value: number;
  name: string;
  min: number;
  max: number;
}

const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  name,
  min,
  max,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="range"
        name={name}
        defaultValue={value}
        min={min}
        max={max}
      />
    </div>
  );
};

export default RangeInput;
