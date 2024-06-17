import React from "react";

interface EmailInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  label,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="email"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EmailInput;
