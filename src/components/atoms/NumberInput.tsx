import React from "react";

interface NumberInputProps {
  label: string;
  value: number;
  name: string;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default NumberInput;
