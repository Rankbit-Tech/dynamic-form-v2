import React from "react";

interface MonthInputProps {
  label: string;
  value: string;
  name: string;
}

const MonthInput: React.FC<MonthInputProps> = ({ label, value, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="month" name={name} defaultValue={value} />
    </div>
  );
};

export default MonthInput;
