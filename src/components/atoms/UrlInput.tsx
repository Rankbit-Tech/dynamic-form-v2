import React from "react";

interface URLInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const URLInput: React.FC<URLInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="url"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default URLInput;
