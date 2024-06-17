import React from "react";

interface WeekInputProps {
  label: string;
  value: string;
  name: string;
}

const WeekInput: React.FC<WeekInputProps> = ({ label, value, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="week" name={name} defaultValue={value} />
    </div>
  );
};

export default WeekInput;
