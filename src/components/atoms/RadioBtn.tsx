import React from "react";

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  isChecked: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  isChecked,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={isChecked}
      />
    </div>
  );
};

export default RadioButton;
