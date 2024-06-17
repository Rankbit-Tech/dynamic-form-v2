import React from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="password"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PasswordInput;
