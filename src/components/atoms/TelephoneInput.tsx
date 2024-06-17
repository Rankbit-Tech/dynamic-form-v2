import React from "react";

interface TelInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const TelInput: React.FC<TelInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="tel"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TelInput;
