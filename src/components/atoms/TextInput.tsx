import React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, name, placeholder }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" name={name} defaultValue={value} placeholder={placeholder} />
    </div>
  );
};

export default TextInput;
